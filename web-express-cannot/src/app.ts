import express from "express"
import admin from "firebase-admin"
import distance from "google-distance-matrix"
import nodemailer from "nodemailer"
import path from "path"
import { OBJECT, STRING, validate_express } from "validate-any"
import { Booking, User } from "./types"

const config = require("../config.json")

const PORT = 3000
const app = express()
app.use(express.json())

admin.initializeApp({
	credential: admin.credential.cert(config.firebase.service_account)
})
const db = admin.firestore()
distance.key(config.google)
distance.mode("driving")
distance.traffic_model("best_guess")

const timeouts: Map<string, NodeJS.Timeout> = new Map()
const bookings = db.collection("bookings") as FirebaseFirestore.CollectionReference<Booking>

bookings.onSnapshot(snaps => {
	for (const change of snaps.docChanges()) {
		switch (change.type) {
			case "added":
				if (change.doc.data().status !== "waiting_arrival") {
					return
				}

				const ms = change.doc.data().book_time - Date.now() + 60 * 60 * 1000
				timeouts.set(
					change.doc.id,
					setTimeout(() => {
						console.log(`${change.doc.id}: Booking cancelled`)
						timeouts.delete(change.doc.id)
						change.doc.ref.update({
							status: "cancelled"
						})
					}, ms)
				)
				console.log(`${change.doc.id}: Waiting ${(ms / 1000) | 0}s for booking ${change.doc.id} to be busy`)
				break
			case "modified":
				if (change.doc.data().status !== "waiting_arrival") {
					const timeout = timeouts.get(change.doc.id)
					if (timeout) {
						clearTimeout(timeout)
						timeouts.delete(change.doc.id)
						console.log(`${change.doc.id}: Booking ${change.doc.id} auto-cancel cancelled`)
					}
				}
		}
	}
})

app.use((_, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})

app.post(
	"/login",
	validate_express(
		OBJECT({
			id: STRING(),
			email: STRING()
		})
	),
	async (req, res) => {
		const { id, email } = req.body as {
			id: string
			email: string
		}

		const snap = (await db.collection("users").doc(id).get()) as FirebaseFirestore.DocumentSnapshot<User>
		if (snap.exists) {
			return res.status(200).end()
		}
		await snap.ref.set({ id: snap.id, is_staff: false, email })

		return res.status(200).end()
	}
)

app.post("/email", validate_express(OBJECT({ email: STRING() })), async (req, res) => {
	const email = req.body.email as string
	const transport = nodemailer.createTransport(config.smtp)
	try {
		await transport.sendMail({
			from: config.smtp.auth.user,
			to: email,
			subject: "Your truck is ready for departure!",
			text: "Your truck is ready for departure! Please proceed to your truck and vacate the dock for other users"
		})
	} catch (e) {
		console.error(e)
	}
	res.status(200).end()
})

app.get("/duration", (req, res) => {
	const { origin, destination } = req.query

	if (!origin) {
		return res.status(400).send("No origin")
	}

	if (!destination) {
		return res.status(400).send("No destination")
	}

	distance.departure_time(Date.now())
	distance.matrix([origin as string], [destination as string], (err, distances) => {
		if (err) {
			console.error(err)
			return res.status(400).send("An error occurred")
		}

		const result = distances.rows[0].elements[0]
		if (result.status === "OK") {
			const total_seconds = result.duration_in_traffic.value + 300

			const seconds = total_seconds % 60
			const minutes = ((total_seconds / 60) | 0) % 60
			const hours = (total_seconds / 3600) | 0

			if (hours === 0) {
				if (minutes === 0) {
					return res.status(200).send(`${seconds.toString().padStart(2, " ")}s`)
				}
				return res
					.status(200)
					.send(`${minutes.toString().padStart(2, " ")}m ${seconds.toString().padStart(2, " ")}s`)
			}
			return res
				.status(200)
				.send(
					`${hours.toString().padStart(2, " ")}h ${minutes.toString().padStart(2, " ")}m ${seconds
						.toString()
						.padStart(2, " ")}s`
				)
		} else {
			console.error("No route found")
			return res.status(400).send("An error occurred")
		}
	})
})

app.use(express.static(path.join(__dirname, "../public")))
app.get("*", (_, res) => res.sendFile(path.join(__dirname, "../public/index.html")))

console.log(`Listening to "bookings" collection`)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
