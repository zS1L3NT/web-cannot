<template>
	<div class="col col-sm-12">
		<div class="warehouse">
			<h4>{{ warehouse.name || "" }}</h4>
			<p>{{ warehouse.address || "" }}</p>
			<div>
				<p>Available Docks:</p>
				<p>
					<b>{{ available }}</b> / {{ total }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { firebase } from "@firebase/app"
import "firebase/firestore"

export default {
	name: "Warehouse",
	props: {
		warehouse_id: String
	},
	data() {
		return {
			warehouse: {},
			docks: [],
			bookings: []
		}
	},
	created() {
		const db = firebase.firestore()
		db.collection("warehouses")
			.doc(this.warehouse_id)
			.get()
			.then(snap => (this.warehouse = snap.data()))
			.catch(console.error)

		db.collection("docks")
			.where("warehouse_id", "==", this.warehouse_id)
			.get()
			.then(snaps => (this.docks = snaps.docs.map(snap => snap.data())))
			.catch(console.error)

		db.collection("bookings")
			.where("warehouse_id", "==", this.warehouse_id)
			.where("status", "not-in", ["completed", "cancelled"])
			.get()
			.then(snaps => (this.bookings = snaps.docs.map(snap => snap.data())))
			.catch(console.error)
	},
	computed: {
		available() {
			return this.docks.length - this.bookings.length
		},
		total() {
			return this.docks.length
		}
	}
}
</script>

<style scoped>
.col {
	width: fit-content;
	margin: 0 auto;
}

.warehouse {
	width: 320px;
	padding: 20px;
	margin: 20px auto;
	border-radius: 15px;
	box-shadow: 0 2px 10px rgb(0 0 0 / 30%);
}

.warehouse:hover {
	transition: box-shadow 0.2s;
	box-shadow: 0 10px 20px rgb(0 0 0 / 30%);
	cursor: pointer;
}

.warehouse > h4 {
	font-weight: bold;
}

.warehouse > p {
	font-size: 18px;
}

.warehouse > div {
	display: flex;
	justify-content: space-between;
}

.warehouse > div > p:nth-child(1) {
	font-size: 18px;
	height: fit-content;
	line-height: 1;
	margin: auto 0;
}

.warehouse > div > p:nth-child(2) {
	font-size: 20px;
	padding: 10px 15px;
	background-color: #eee;
	border-radius: 5px;
	height: fit-content;
	margin: auto 0;
}

h2 {
	margin-bottom: 1rem;
}
</style>
