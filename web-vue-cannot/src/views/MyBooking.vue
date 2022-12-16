<template>
	<div class="MyBooking">
		<h1>Current Booking</h1>
		<main>
			<div class="data">
				<section class="titles">
					<p>Warehouse:</p>
					<p>Address:</p>
					<p>Status:</p>
					<p v-if="booking.status === 'waiting_arrival'">Time Left:</p>
					<p>Dock:</p>
					<p>Load Type:</p>
				</section>
				<section class="values">
					<p>
						{{ warehouse.name || "..." }}
					</p>
					<p>
						{{ warehouse.address || "..." }}
					</p>
					<p>
						{{ booking.status || "..." }}
					</p>
					<p v-if="booking.status === 'waiting_arrival'">
						{{ time_left }}
					</p>
					<p>
						{{ dock.name || "..." }}
					</p>
					<p>
						{{ dock.load_type || "..." }}
					</p>
				</section>
			</div>
		</main>
		<div v-if="booking.status === 'waiting_arrival'">
			<button class="btn btn-main btn-success" type="button" @click="arrived">
				Declare Arrival
			</button>
			<br />
			<button class="btn btn-main btn-danger" type="button" @click="confirm">
				Cancel
			</button>
		</div>
		<div v-if="booking.status === 'busy'" style='font-size:large;'>
			Please wait while docking bay is busy...
		</div>
		<button v-if="booking.status === 'waiting_departure'" class="btn btn-main btn-success" type="button" @click="done">
			Declare Departure
		</button>
		<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" id="toast" data-bs-autohide="false">
			<div class="toast-body">
				The browser will request for your location. Please Allow Permission.
				<div class="mt-2 pt-2 border-top ">
					<button type="button" class="btn btn-primary btn-sm" data-bs-dismiss="toast" @click="call">
						I Understand
					</button>
				</div>
			</div>
		</div>
	</div>

	<div
		class="modal fade"
		id="staticBackdrop"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="staticBackdropLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">Confirmation</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body" style="text-align: left">
					Are you sure you want to cancel the booking?
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
						Close
					</button>
					<button class="btn btn-danger" type="button" @click="cancel" data-bs-dismiss="modal">
						Yes, Cancel
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import "@popperjs/core/dist/umd/popper.min.js"
import * as bootstrap from "bootstrap/dist/js/bootstrap.js"
import { firebase } from "@firebase/app"
import "firebase/firestore"
import "firebase/auth"
import axios from "axios"

const db = firebase.firestore()

export default {
	name: "MyBooking",
	data() {
		return {
			booking: {},
			warehouse: {},
			dock: {},
			time_left: "...",
			accepted: false
		}
	},
	created() {
		firebase.auth().onAuthStateChanged(async user => {
			try {
				if (user) {
					const snap = (
						await db
							.collection("bookings")
							.where("user_id", "==", user.uid)
							.where("status", "not-in", ["completed", "cancelled"])
							.get()
					).docs[0]

					if (snap && snap.exists) {
						this.booking = snap.data()

						db.collection("warehouses")
							.doc(this.booking.warehouse_id)
							.get()
							.then(snap => {
								if (snap.exists) {
									this.warehouse = snap.data()
								}
							})

						db.collection("docks")
							.doc(this.booking.dock_id)
							.get()
							.then(snap => {
								if (snap.exists) {
									this.dock = snap.data()
								}
							})
					} else {
						this.$router.push("/warehouses")
					}
				} else {
					this.$router.push("/")
				}
			} catch (e) {
				console.error(e)
			}
		})

		setInterval(() => {
			const total_milliseconds = 60 * 60 * 1000 - (Date.now() - (this.booking.book_time || 0))
			const total_seconds = (total_milliseconds / 1000) | 0

			const seconds = total_seconds % 60
			const minutes = (total_seconds / 60) | 0

			if (minutes === 0) {
				if (seconds === 0) {
					this.$router.push("/warehouses")
				}
				this.time_left = `${seconds.toString().padStart(2, " ")}s`
			}
			this.time_left = `${minutes.toString().padStart(2, " ")}m ${seconds.toString().padStart(2, " ")}s`
		}, 1000)
	},
	mounted() {
		if (window.navigator.geolocation) {
			var toast = document.getElementById("toast")
			var bsAlert = new bootstrap.Toast(toast)
			bsAlert.show()
		}
	},
	methods: {
		feed_location() {
			window.navigator.geolocation.getCurrentPosition(async position => {
				this.accepted = true
				const { latitude, longitude } = position.coords

				const origin = latitude + "," + longitude
				const destination = encodeURIComponent(this.warehouse.address)

				try {
					const res = await axios.get(
						`https://0d13-58-182-61-207.ngrok.io/duration?origin=${origin}&destination=${destination}`
					)
					await db.collection("bookings")
							.doc(this.booking.id)
							.update({ eta: res.data })
					setTimeout(this.feed_location, 5000)
				} catch (e) {
					console.error(e)
				}
			})
		},
		call() {
			this.feed_location()
			setTimeout(() => {
				if (!this.accepted) {
					var toast = document.getElementById("toast")
					new bootstrap.Toast(toast).show()
				}
			}, 3000)
		},
		confirm() {
			new bootstrap.Modal(document.getElementById("staticBackdrop"), {}).show()
		},
		cancel() {
			db.collection("bookings")
				.doc(this.booking.id)
				.update({
					status: "cancelled"
				})
				.then(() => this.$router.push("/warehouses"))
				.catch(console.error)
		},
		arrived() {
			db.collection("bookings")
				.doc(this.booking.id)
				.update({
					status: "busy"
				})
				.then(() => window.location.reload())
				.catch(console.error)
		},
		done() {
			db.collection("bookings")
				.doc(this.booking.id)
				.update({
					status: "completed",
					end_time: Date.now()
				})
				.then(() => this.$router.push("/warehouses"))
				.catch(console.error)
		}
	}
}
</script>

<style>
.MyBooking {
	width: 100%;
	height: 100%;
}

h1 {
	margin: 30px 0;
}

p {
	font-size: 20px;
}

main {
	display: flex;
	justify-content: center;
	align-items: center;
}

.data {
	display: flex;
}

section {
	width: fit-content;
}

.titles {
	margin-right: 10px;
}

.titles > p {
	text-align: end;
}

.values {
	margin-left: 10px;
	margin-right: 20px;
}

.values > p {
	text-align: start;
	font-weight: bold;
}

.btn-main {
	margin: 10px;
}

#toast {
	position: absolute;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
}
</style>
