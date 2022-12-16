<template>
	<div class="WarehouseAdd container">
		<div class="row">
			<div class="add_warehouse" @click="open_modal()">
				<div>
					<div class="plus"></div>
					<h3>Add Warehouses</h3>
				</div>
			</div>
		</div>
	</div>

	<div
		class="modal fade"
		id="backdrop-warehouse-add"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="backdrop-label"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="backdrop-label">Add New Warehouse</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form>
						<div class="mb-3">
							<label for="recipient-name" class="col-form-label">Warehouse Name:</label>
							<input type="text" class="form-control" id="recipient-name" v-model="name" />
							<small v-if="warehouse_error">Warehouse Name cannot be empty</small>
						</div>

						<div class="mb-3">
							<label for="message-text" class="col-form-label">Warehouse Address:</label>
							<textarea class="form-control" id="message-text" v-model="address"></textarea>
							<small v-if="address_error">Warehouse Address cannot be empty</small>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
						Close
					</button>
					<button type="button" id="warehouse-modal" class="btn btn-primary" @click="add()">
						Apply
					</button>
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
	name: "WarehouseAdd",
	data() {
		return {
			address_error: false,
			warehouse_error: false,
			name: "",
			address: ""
		}
	},
	methods: {
		async add() {
			if (this.address === "") {
				this.address_error = true
				return
			}

			if (this.name === "") {
				this.warehouse_error = true
				return
			}

			var modal = document.getElementById("warehouse-modal")
			modal.setAttribute("data-bs-dismiss", "modal")
			modal.click()
			modal.removeAttribute("data-bs-dismiss")

			const warehouse = db.collection("warehouses").doc()
			await warehouse.set({
				id: warehouse.id,
				name: this.name,
				address: this.address
			})
			window.location.reload()
		},
		open_modal() {
			new bootstrap.Modal(document.getElementById("backdrop-warehouse-add"), {}).show()
		}
	}
}
</script>

<style scoped>
.WarehouseAdd > .row {
	margin: auto;
}

.plus {
	width: 1.35rem;
	height: 1.35rem;
	background-color: black;
	clip-path: polygon(0%45%, 45%45%, 45%0, 55%0%, 55%45%, 100%45%, 100%55%, 55%55%, 55%100%, 45%100%, 45%55%, 0%55%);
	margin: 0.5rem auto 0 auto;
}

.add_warehouse {
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

.add_warehouse > div > h3 {
	margin: 0.5rem 0;
	font-weight: bold;
	font-size: large;
}

@media (min-width: 768px) {
	.add_warehouse {
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

.modal-body {
	text-align: left;
}

small {
	color: red;
}
</style>
