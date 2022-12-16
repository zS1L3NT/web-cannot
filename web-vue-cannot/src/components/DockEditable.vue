<template>
	<div class="DockEditable col-lg-4">
		<div class="dock" @click="open_modal(dock.id, dock.booking)">
			<h3>{{ dock.name || "" }}</h3>
			<p>Type of docking bay: {{ dock.load_type || "" }}</p>
			<div class="row dock-status">
				<p>Status:</p>
				<div v-if="dock.booking && dock.booking.status == 'waiting_arrival'" class="waitDriver">
					<b>Waiting for driver</b>
				</div>
				<div v-else-if="dock.booking && dock.booking.status == 'busy'" class="busy">
					<b>Busy</b>
				</div>
				<div v-else-if="dock.booking && dock.booking.status == 'waiting_departure'" class="waitDep">
					<b>Waiting for departure</b>
				</div>
				<div v-else class="available"><b>Available</b></div>
			</div>
		</div>
	</div>

	<div
		class="modal fade"
		:id="'backdrop-dock-editable-' + dock.id"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="backdrop-label"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="backdrop-label">Change Docking Bay Status</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<select class="form-select" aria-label="Default select example" v-model="status">
						<option selected>Docking Bay Status</option>
						<option value="waiting_departure">Waiting Departure</option>
						<option value="cancelled">Cancelled</option>
					</select>
					<small v-if="show_status">Please Select A Status</small>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
						Close
					</button>
					<button type="button" class="btn btn-primary" @click="edit()">Apply</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import * as bootstrap from "bootstrap/dist/js/bootstrap.js"
import { firebase } from "@firebase/app"
import "firebase/firestore"
import axios from "axios"

const db = firebase.firestore()

export default {
	name: "DockEditable",
	props: {
		dock: Object
	},
	data() {
		return {
			show_status: false,
			bookings: [],
			status: {}
		}
	},
	methods: {
		open_modal(dock_id, dock_booking_status) {
			if (dock_booking_status == null) {
			} else {
				new bootstrap.Modal(document.getElementById("backdrop-dock-editable-" + this.dock.id), {}).show()

				db.collection("bookings")
					.where("status", "not-in", ["completed", "cancelled"])
					.where("dock_id", "==", dock_id)
					.get()
					.then(snaps => {
						this.bookings = snaps.docs.map(snap => snap.data())
						this.status = this.bookings[0].status
					})
					.catch(console.error)
			}
		},
		async edit() {
			this.show_status = false

			if (this.status === "Docking Bay Status") {
				this.show_status = true
			}

			if (this.status === "waiting_departure") {
				const snap = await db
					.collection("users")
					.doc(this.dock.booking.user_id)
					.get()
				if (snap.exists) {
					const { email } = snap.data()
					await axios.post("https://0d13-58-182-61-207.ngrok.io/email", { email })
					await db
						.collection("bookings")
						.doc(this.dock.booking.id)
						.update({ status: this.status })
					window.location.reload()
				}
			}

			if (this.status !== "Docking Bay Status") {
				await db
					.collection("bookings")
					.doc(this.dock.booking.id)
					.update({ status: this.status })
				window.location.reload()
			}
		}
	}
}
</script>

<style scoped>
.DockEditable {
	display: flex;
	justify-content: center;
	align-items: center;
}

.dock > h3 {
	font-size: large;
	font-weight: bold;
}

.dock > p {
	font-size: medium;
	margin-bottom: 0.5rem;
}

.row {
	display: flex;
	justify-content: center;
	align-items: center;
}

.row > p {
	font-size: medium;
	font-weight: bold;
	width: fit-content;
	margin: 0 0.2rem 0 0;
	padding: 0;
}

.dock-status > div {
	width: fit-content;
	padding: 0;
}

.dock:not(.available):not(.waiting):not(.busy) {
	width: 16rem;
	height: 8rem;
	border: solid grey 0px;
	border-radius: 20px;
	margin: 1rem auto;
	box-shadow: 0 2px 10px rgb(0, 0, 0, 0.3);
	color: black;
	background-color: white;
	padding-top: 1.8rem;
	cursor: pointer;
}

.dock:not(.available):not(.busy):not(.waitDriver):not(.waitDep):hover {
	box-shadow: 0 10px 20px rgb(0, 0, 0, 0.3);
	color: white;
	transition: color 0.5s, background-color 0.4s;
	background-color: rgb(50, 50, 50);
	/* animation-name: ; */
	animation-duration: 0.5s;
	animation-iteration-count: infinite;
	animation-timing-function: ease-in-out;
}

.dock > .busy,
.dock > .waitDriver,
.dock > .waitDep {
	cursor: pointer;
}

.dock > .available {
	cursor: default;
}

.available {
	color: green;
	font-size: medium;
	width: fit-content !important;
	padding: 0;
	margin: 0;
	cursor: default !important;
}

.busy {
	color: red;
	font-size: medium;
	width: fit-content !important;
	padding: 0;
	margin: 0;
}

.waitDriver {
	color: blue;
	font-size: medium;
	width: fit-content !important;
	padding: 0;
	margin: 0;
}

.waitDep {
	color: goldenrod;
	font-size: medium;
	width: fit-content !important;
	padding: 0;
	margin: 0;
}

.empty {
	width: 16rem;
	height: 8rem;
	margin: 1rem auto;
}

.modal-body {
	text-align: left;
}

small {
	color: red;
}
</style>
