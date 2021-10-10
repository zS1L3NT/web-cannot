<template>
	<div class="Book">
		<ClipLoader size="75px" v-if="loading.every(b => b)" />
		<div class="container" v-if="!loading.every(b => b)">
			<div class="row">
				<form @submit="submit">
					<h1>Book a Dock</h1>
					<h2>{{ warehouse.name || "" }}</h2>
					<p>
						You are expected to reach your destination by <span>60 minutes</span>. If not, your booking will
						be automatically <span>cancelled</span>
					</p>
					<div class="inputs">
						<div v-for="dock in docks" :key="dock.id" class="form-check">
							<input
								class="form-check-input"
								type="radio"
								name="dock"
								v-model="dock_id"
								:value="dock.id"
								:id="dock.id"
								:disabled="input_disabled(dock.id)"
							/>
							<label class="form-check-label" :for="dock.id">
								{{ dock.name || "" }}
							</label>
						</div>
					</div>
					<button class="btn btn-primary" type="submit" :disabled="!dock_id">Book Dock</button>
				</form>
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
					<h5 class="modal-title" id="staticBackdropLabel">Error Occured</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body" style="text-align: left">
					You already have an existing booking!
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import * as bootstrap from "bootstrap/dist/js/bootstrap.js"
import ClipLoader from "vue-spinner/src/ClipLoader.vue"
import { firebase } from "@firebase/app"
import "firebase/firestore"
import "firebase/auth"

const db = firebase.firestore()

export default {
	name: "Book",
	components: {
		ClipLoader
	},
	data() {
		return {
			loading: [true, true],
			user_id: "",
			warehouse: {},
			docks: [],
			bookings: [],
			dock_id: ""
		}
	},
	created() {
		const warehouse_id = this.$route.path.slice(6)

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.loading[0] = false
				this.user_id = user.uid
			} else {
				this.$router.push("/")
			}
		})

		db.collection("warehouses")
			.doc(warehouse_id)
			.get()
			.then(snap => {
				if (snap.exists) {
					this.loading[1] = false
					this.warehouse = snap.data()
				} else {
					this.$router.push("/warehouses")
				}
			})
			.catch(console.error)

		db.collection("docks")
			.where("warehouse_id", "==", warehouse_id)
			.get()
			.then(snaps =>
				(this.docks = snaps.docs.map(snap => snap.data())).sort((a, b) => (a.name > b.name ? 1 : -1))
			)
			.catch(console.error)

		db.collection("bookings")
			.where("warehouse_id", "==", warehouse_id)
			.where("status", "not-in", ["completed", "cancelled"])
			.get()
			.then(snaps => (this.bookings = snaps.docs.map(snap => snap.data())))
			.catch(console.error)
	},
	methods: {
		input_disabled(dock_id) {
			return !!this.bookings.find(booking => booking.dock_id === dock_id)
		},
		async submit(e) {
			e.preventDefault()
			this.loading = [true]

			try {
				const snap = (await db
					.collection("bookings")
					.where("user_id", "==", this.user_id)
					.where("status", "not-in", ["completed", "cancelled"])
					.get()
				).docs[0]

				if (snap && snap.exists) {
					new bootstrap.Modal(document.getElementById("staticBackdrop"), {}).show()
					this.loading = [false]
				} else {
					const booking = db.collection("bookings").doc()
					await booking.set({
						id: booking.id,
						user_id: this.user_id,
						dock_id: this.dock_id,
						warehouse_id: this.warehouse.id,
						status: "waiting",
						book_time: Date.now(),
						end_time: null
					})
					this.$router.push("/warehouses")
				}
			} catch (e) {
				console.error(e)
			}
		}
	}
}
</script>

<style scoped>
.Book {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.inputs {
	width: fit-content;
	margin: auto;
}

.form-check {
	text-align: left;
	margin: 5px;
}

.form-check-label {
	font-size: 20px;
	margin: 0 40px 0 20px;
}

.btn-primary {
	margin: 20px;
}

p {
	width: 360px;
	font-size: 18px;
	margin: 0 auto 30px auto;
}

span {
	color: red;
}
</style>
