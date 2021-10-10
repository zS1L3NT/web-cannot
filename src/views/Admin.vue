<template>
	<div style="text-align:right;margin:auto;">
		<button type="button" class="btn btn-secondary" style="margin:5px;" @click="to_warehouses()">
			Go To Warehouses
		</button>
	</div>

	<div class="Admin" style="margin-top:40px;">
		<h1>Admin Panel</h1>
		<WarehouseEditable v-for="warehouse in warehouses" :key="warehouse.id" :warehouse="warehouse">
			<DockEditable v-for="dock in warehouse.docks" :key="dock.id" :dock="dock" />
			<DockAdd :warehouse="warehouse" />
			<div v-if="warehouse.docks.length === 1" class="col-lg-4">
				<div class="empty"></div>
			</div>
		</WarehouseEditable>
		<WarehouseAdd />
	</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import { firebase } from "@firebase/app"
import "firebase/firestore"
import DockEditable from "../components/DockEditable.vue"
import DockAdd from "../components/DockAdd.vue"
import WarehouseEditable from "../components/WarehouseEditable.vue"
import WarehouseAdd from "../components/WarehouseAdd.vue"

const db = firebase.firestore()

export default {
	name: "Admin",
	components: {
		DockEditable,
		DockAdd,
		WarehouseEditable,
		WarehouseAdd
	},
	data() {
		return {
			warehouses: []
		}
	},
	created() {
		db.collection("warehouses")
			.get()
			.then(snaps => {
				this.warehouses = snaps.docs
					.map(snap => snap.data())
					.sort((a, b) => (a.name > b.name ? 1 : -1))
					.map(data => ({ ...data, docks: [] }))
			})
			.catch(console.error)

		db.collection("docks")
			.orderBy("load_type")
			.get()
			.then(snaps =>
				snaps.docs
					.map(snap => snap.data())
					.sort((a, b) => (a.name > b.name ? 1 : -1))
					.forEach(data => {
						this.warehouses.find(w => w.id == data.warehouse_id).docks.push(data)
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
		to_warehouses() {
			this.$router.push("/warehouses")
		}
	}
}
</script>

<style>
.container {
	height: fit-content;
	width: fit-content;
	margin: auto;
	overflow: auto;
}

.col {
	width: 300px;
	margin: 0 auto;
}
</style>

<style scoped>
h1 {
	font-weight: bold;
	font-size: 1.5rem;
	margin-bottom: 25px;
	margin-top: 20px;
}
</style>
