<template>
	<div class="col-lg-4">
		<div class="add_dock" @click="open_modal()">
			<div class="plus"></div>
		</div>
	</div>

	<div
		class="modal fade"
		:id="'backdrop-dock-add-' + warehouse.id"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="backdrop-label"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="backdrop-label">Add a new docking bay</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form>
						<div class="mb-3">
							<label for="recipient-name" class="col-form-label">Dock Name:</label>
							<input type="text" class="form-control" v-model="name" />
						</div>
						<div class="mb-3">
							<label for="message-text" class="col-form-label">Dock Load Type:</label>
							<select class="form-select" aria-label="Default select example" v-model="load_type">
								<option selected>Dock Load Type</option>
								<option value="loading">Loading</option>
								<option value="unloading">Unloading</option>
							</select>
						</div>
					</form>
					<small id="show-valid" hidden>Invalid fields</small>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
						Close
					</button>
					<button type="button" class="btn btn-primary" @click="add()">Add</button>
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
	name: "DockAdd",
	props: {
		warehouse: Object
	},
	data() {
		return {
			name: "",
			load_type: ""
		}
	},
	methods: {
		open_modal() {
			new bootstrap.Modal(document.getElementById("backdrop-dock-add-" + this.warehouse.id), {}).show()
		},
		async add() {
			var show_valid = document.getElementById("show-valid")
			show_valid.removeAttribute("hide")

			if (this.load_type !== "Dock Load Type" && this.name !== "") {
				show_valid.setAttribute("hide", true)

				const dock = db.collection("docks").doc()
				await dock.set({
					id: dock.id,
					warehouse_id: this.warehouse.id,
					load_type: this.load_type,
					name: this.name
				})
				window.location.reload()
			}
		}
	}
}
</script>

<style scoped>
.plus {
	width: 2rem;
	height: 2rem;
	background-color: black;
	clip-path: polygon(0%45%, 45%45%, 45%0, 55%0%, 55%45%, 100%45%, 100%55%, 55%55%, 55%100%, 45%100%, 45%55%, 0%55%);
}

.add_dock {
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

.add_dock:hover {
	background-color: black;
}

.add_dock:hover .plus {
	background-color: white;
}

.modal-body {
	text-align: left;
}

small {
	color: red;
}
</style>
