<template>
	<div style="text-align:right;margin:auto;">
		<button type="button" class="btn btn-secondary" style="margin:5px;" @click="to_warehouses()">
			Go To Warehouses
		</button>
	</div>

	<div class="Admin" style="margin-top:40px;">
		<h1>Admin Panel</h1>

		<div v-for="warehouse in warehouses" :key="warehouse.id">
			<div class="container">
				<div class="row" style="margin:auto;">
					<div class="warehouses" @click="open_dropdown(warehouse.id)">
						<h3>{{ warehouse.name || "" }}</h3>
						<p>{{ warehouse.address || "" }}</p>
					</div>

					<div :id="warehouse.id" class="dropdown" style="display: none">
						<div class="container">
							<div class="row">
								<div
									class="col-lg-4"
									style="display:flex;justify-content:center;align-items:center;"
									v-for="dock in warehouse.docks"
									:key="dock.id"
								>
									<div class="dock" @click="open_modal(dock.id)">
										<h3>{{ dock.name || "" }}</h3>
										<p>Type of docking bay: {{ dock.load_type || "" }}</p>
										<div
											class="row"
											style="display:flex;justify-content:center;align-items:center;"
										>
											<div
												style="font-size:medium;width:fit-content;margin:0 0.2rem 0 0;padding:0;"
											>
												<b>Status: </b>
											</div>
											<div v-if="dock.booking" style="width:fit-content;padding:0;">
												<div v-if="dock.booking.status == 'waiting'" class="waiting">
													<b>Waiting</b>
												</div>
												<div v-if="dock.booking.status == 'busy'" class="busy"><b>Busy</b></div>
											</div>
											<div v-else class="available"><b>Available</b></div>
										</div>
									</div>
								</div>
								<div class="col-lg-4">
									<div class="addDocks" @click="addDocksPopup(warehouse.id)">
										<div class="plus"></div>
									</div>
								</div>
								<div v-if="warehouse.docks.length === 1" class="col-lg-4">
									<div class="empty"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row" style="margin:auto">
				<div class="addWarehouses" @click="open_createWarehouseModal()">
					<div>
						<div class="smallPlus"></div>
						<h3>Add Warehouses</h3>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div
		class="modal fade"
		id="staticBackdrop1"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="staticBackdropLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">Change Docking Bay Status</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body" style="text-align:left">
					<select class="form-select" aria-label="Default select example" v-model="status">
						<option selected>Docking Bay Status</option>
						<option value="waiting">Waiting</option>
						<option value="busy">Busy</option>
						<option value="completed">Completed</option>
					</select>
					<small style="color:red;" id="showStatus" hidden>Please Select A Status</small>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
						Close
					</button>
					<button type="button" class="btn btn-primary" @click="change_status()">Apply</button>
				</div>
			</div>
		</div>
	</div>
	<!-- addWarehouses -->
	<div
		class="modal fade"
		id="staticBackdrop0"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="staticBackdropLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">Add New Warehouse</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body" style="text-align:left">
					<form>
						<div class="mb-3">
							<label for="recipient-name" class="col-form-label">Warehouse Name:</label>
							<input type="text" class="form-control" id="recipient-name" v-model="newWarehouseName" />
							<small style="color:red;" v-if="showWarehouseError">Warehouse Name cannot be empty</small>
						</div>

						<div class="mb-3">
							<label for="message-text" class="col-form-label">Warehouse Address:</label>
							<textarea class="form-control" id="message-text" v-model="newWarehouseAddress"></textarea>
							<small style="color:red;" v-if="showAddressError">Warehouse Address cannot be empty</small>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
						Close
					</button>
					<button type="button" id="closeModal" class="btn btn-primary" @click="addNewWarehouse()">
						Apply
					</button>
				</div>
			</div>
		</div>
	</div>

	<div
		class="modal fade"
		id="staticBackdrop2"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="staticBackdropLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">Add a new docking bay</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body" style="text-align:left">
					<form>
						<div class="mb-3">
							<label for="recipient-name" class="col-form-label">Dock Name:</label>
							<input type="text" class="form-control" id="dockName" v-model="dockName" />
						</div>
						<div class="mb-3">
							<label for="message-text" class="col-form-label">Dock Load Type:</label>
							<select class="form-select" aria-label="Default select example" v-model="dockLoadType">
								<option selected>Dock Load Type</option>
								<option value="loading">Loading</option>
								<option value="unloading">Unloading</option>
							</select>
						</div>
					</form>
					<small style="color:red;" id="showValid" hidden>Invalid fields</small>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
						Close
					</button>
					<button type="button" class="btn btn-primary" @click="addDocks()">Add</button>
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

const db = firebase.firestore()

export default {
	name: "Admin",
	data() {
		return {
			warehouses: [],
			bookingId: "",
			open: false,
			status: "",
			dockId: "",
			dockName: "",
			dockLoadType: "",
			dockWarehouseId: "",
			showWarehouseError: false,
			showAddressError: false,
			newWarehouseName: "",
			newWarehouseAddress: ""
		}
	},
	created() {
		db.collection("warehouses")
			.get()
			.then(snaps => {
				this.warehouses = snaps.docs
					.map(snap => snap.data())
					.sort((a, b) => a.name > b.name ? 1 : -1)
					.map(data => ({ ...data, docks: [] }))
			})
			.catch(console.error)

		db.collection("docks")
			.orderBy("load_type")
			.get()
			.then(snaps =>
				snaps.docs
					.map(snap => snap.data())
					.sort((a, b) => a.name > b.name ? 1 : -1)
					.forEach(data => {
						this.warehouses
							.find(w => w.id === data.warehouse_id)
							.docks
							.push(data)
					})
			)
			.catch(console.error)

		db.collection("bookings")
			.where("status", "not-in", ["completed", "cancelled"])
			.get()
			.then(snaps => {
				snaps.forEach(snap => {
					const booking = snap.data()

					this.warehouses.forEach((warehouse, i) => {
						warehouse.docks.forEach((dock, j) => {
							if (dock.id === booking.dock_id) {
								this.warehouses[i].docks[j].booking = booking
							} else {
								this.warehouses[i].docks[j].booking = null
							}
						})
					})
				})
			})
			.catch(console.error)
	},
	methods: {
		addNewWarehouse() {
			if (this.newWarehouseAddress === "") {
				this.showAddressError = true
			}
			if (this.newWarehouseName === "") {
				this.showWarehouseError = true
			}
			if (this.newWarehouseAddress != "" && this.newWarehouseName != "") {
				var warehouseModal = document.getElementById("closeModal")
				warehouseModal.setAttribute("data-bs-dismiss", "modal")
				warehouseModal.click()
				var warehouseModal = document.getElementById("closeModal")
				warehouseModal.removeAttribute("data-bs-dismiss")
				// api call to end point
			}
		},
		open_createWarehouseModal() {
			new bootstrap.Modal(document.getElementById("staticBackdrop0"), {}).show()
		},
		to_warehouses() {
			this.$router.push("/warehouses")
		},
		getBookingId() {
			db.collection("bookings")
				.where("dock_id", "==", this.dockId)
				.where("status", "not-in", ["completed", "cancelled"])
				.get()
				.then(snaps => {
					this.bookingId = snaps.docs.map(snap => snap.data().id)
					console.log(this.bookingId[0])
				})
				.catch(console.error)
		},
		change_status() {
			var showStatus = document.getElementById("showStatus")
			showStatus.removeAttribute("hide")

			if (this.status !== "Docking Bay Status") {
				showStatus.setAttribute("hide", true)
				db.collection("bookings")
					.doc(this.bookingId[0])
					.update({
						status: this.status
					})
				window.location.href = "admin"
			}
		},
		open_modal(dock_id) {
			this.dockId = dock_id
			this.getBookingId()
			new bootstrap.Modal(document.getElementById("staticBackdrop1"), {}).show()

			db.collection("bookings")
				.where("status", "not-in", ["completed", "cancelled"])
				.where("dock_id", "", this.dockId)
				.get()
				.then(snaps => {
					this.bookings = snaps.docs.map(snap => snap.data())
					this.status = this.bookings[0].status
				})
				.catch(console.error)
		},
		open_dropdown(id) {
			var el = document.getElementById(id)
			if (el.style.display === "none") {
				el.style.display = "block"
			} else {
				el.style.display = "none"
			}
		},
		addDocksPopup(id) {
			this.dockWarehouseId = id
			new bootstrap.Modal(document.getElementById("staticBackdrop2"), {}).show()
		},
		addDocks() {
			var showValid = document.getElementById("showValid")
			showValid.removeAttribute("hide")
			console.log(this.dockName)
			console.log(this.dockLoadType)
			console.log(this.dockWarehouseId)
			if (this.dockLoadType !== "Dock Load Type" && this.dockName !== "") {
				showStatus.setAttribute("hide", true)

				const dock = db.collection("docks").doc()
				dock.set({
					id: dock.id,
					load_type: this.dockLoadType,
					name: this.dockName,
					warehouse_id: this.dockWarehouseId
				})
				window.location.href = "admin"
			}
		}
	}
}
</script>

<style scoped>
.container {
	height: fit-content;
	width: fit-content;
	margin: auto;
	overflow: auto;
}

h1 {
	font-weight: bold;
	font-size: 1.5rem;
	margin-bottom: 25px;
	margin-top: 20px;
}

.col {
	width: 300px;
	margin: 0 auto;
}

.plus {
	width: 2rem;
	height: 2rem;
	background-color: black;
	clip-path: polygon(0%45%, 45%45%, 45%0, 55%0%, 55%45%, 100%45%, 100%55%, 55%55%, 55%100%, 45%100%, 45%55%, 0%55%);
}

.smallPlus {
	width: 1.35rem;
	height: 1.35rem;
	background-color: black;
	clip-path: polygon(0%45%, 45%45%, 45%0, 55%0%, 55%45%, 100%45%, 100%55%, 55%55%, 55%100%, 45%100%, 45%55%, 0%55%);
	margin: 0.5rem auto 0 auto;
}

.addDocks {
	width: 16rem;
	height: 8rem;
	border: solid grey 0px;
	border-radius: 20px;
	margin: 1rem auto;
	box-shadow: 0 2px 10px rgb(0, 0, 0, 0.3);
	color: black;
	background-color: white;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;
}

.addDocks:hover {
	background-color: black;
}

.addDocks:hover .plus {
	background-color: white;
}

.available {
	color: green;
	font-size: medium;
	width: fit-content !important;
	padding: 0;
	margin: 0;
}

.busy {
	color: red;
	font-size: medium;
	width: fit-content !important;
	padding: 0;
	margin: 0;
}

.waiting {
	color: blue;
	font-size: medium;
	width: fit-content !important;
	padding: 0;
	margin: 0;
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

.dock:not(.available):not(.waiting):not(.busy):hover {
	box-shadow: 0 10px 20px rgb(0, 0, 0, 0.3);
	color: white;
	transition: color 0.5s, background-color 0.4s;
	background-color: rgb(50, 50, 50);
	/* animation-name: ; */
	animation-duration: 0.5s;
	animation-iteration-count: infinite;
	animation-timing-function: ease-in-out;
	cursor: pointer;
}

.empty {
	width: 16rem;
	height: 8rem;
	margin: 1rem auto;
}

.dock > h3 {
	font-size: large;
	font-weight: bold;
}

.dock > p {
	font-size: medium;
	margin-bottom: 0.5rem;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(180deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.warehouses {
	max-width: 100%;
	min-width: 20rem;
	height: 6rem;
	margin: 2rem auto 1rem auto;
	padding-top: 1.5rem;
	box-shadow: 0 2px 6px rgb(0, 0, 0, 0.3);
	cursor: pointer;
}

.addWarehouses {
	cursor: pointer;
	max-width: 100%;
	min-width: 20rem;
	height: 6rem;
	margin: 2rem auto 4rem auto;
	box-shadow: 0 2px 6px rgb(0, 0, 0, 0.3);

	display: flex;
	justify-content: center;
	align-items: center;
}
.addWarehouses > div > h3 {
	margin: 0.5rem 0;
	font-weight: bold;
	font-size: large;
}

.warehouses > h3 {
	font-weight: bold;
	font-size: large;
}

.dropdown {
	animation-name: dropdownanim;
	animation-duration: 0.4s;
}

.dropdown > .container {
	padding-top: 0.5rem;
	width: 100%;
}

@keyframes dropdownanim {
	0% {
		transform: rotateX(-90deg);
	}
	70% {
		transform: rotateX(20deg);
	}
	100% {
		transform: rotateX(0deg);
	}
}

@media (min-width: 768px) {
	.warehouses {
		max-width: 100%;
		min-width: 40rem;
		height: 6rem;
		margin: 2rem auto 1rem auto;
		padding-top: 1.5rem;
		box-shadow: 0 2px 6px rgb(0, 0, 0, 0.3);
	}
	.addWarehouses {
		cursor: pointer;
		max-width: 100%;
		min-width: 40rem;
		height: 6rem;
		margin: 2rem auto 4rem auto;
		box-shadow: 0 2px 6px rgb(0, 0, 0, 0.3);

		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
