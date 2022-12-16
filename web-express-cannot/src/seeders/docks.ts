import admin from "firebase-admin"
import { Dock } from "../types"

const config = require("../../config.json")

admin.initializeApp({
	credential: admin.credential.cert(config.firebase.service_account)
})
const db = admin.firestore()

const docks = db.collection("docks") as FirebaseFirestore.CollectionReference<Dock>

for (let i = 0; i < 10; i++) {
	const dock = docks.doc()
	dock.set({
		id: dock.id,
		name: `Michael's Dock ${i + 1}`,
		warehouse_id: `0spnJYlOjBdAG9FH6x6D`,
		load_type: i % 2 === 0 ? "loading" : "unloading"
	})
}

for (let i = 0; i < 10; i++) {
	const dock = docks.doc()
	dock.set({
		id: dock.id,
		name: `Greg's Dock ${i + 1}`,
		warehouse_id: `JzO4zobt0VOZut8F7XPn`,
		load_type: i % 2 === 0 ? "loading" : "unloading"
	})
}

for (let i = 0; i < 10; i++) {
	const dock = docks.doc()
	dock.set({
		id: dock.id,
		name: `Zech's Dock ${i + 1}`,
		warehouse_id: `ZgiA7HxdwFEDcgd11Wxg`,
		load_type: i % 2 === 0 ? "loading" : "unloading"
	})
}