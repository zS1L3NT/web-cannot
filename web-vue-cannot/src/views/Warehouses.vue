<template>
	<div class="Warehouses">
		<div style="text-align:right;margin:auto;">
			<button type="button" class="btn btn-secondary" style="margin:5px;" v-if="show_admin_button" @click="goToAdmin()">
				Go To Admin
			</button>
		</div>
		<h1 style="font-weight:bold;font-size:2rem">Warehouses</h1>
		<div class="container">
			<div class="row">
				<Warehouse
					v-for="warehouse in warehouses"
					:key="warehouse.id"
					:warehouse_id="warehouse.id"
					@click="() => warehouse_clicked(warehouse.id)"
				/>
			</div>
		</div>
		<div :class="'white-screen ' + (show_page ? '' : 'show')"></div>
	</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import { firebase } from "@firebase/app"
import "firebase/firestore"
import "firebase/auth"
import Warehouse from "../components/Warehouse"

const db = firebase.firestore()

export default {
	name: "Warehouses",
	components: {
		Warehouse
	},
	data() {
		return {
			warehouses: [],
			show_page: true,
			show_admin_button: false
		}
	},
	created() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				db.collection("bookings")
					.where("user_id", "==", user.uid)
					.where("status", "not-in", ["completed", "cancelled"])
					.get()
					.then(snaps => {
						const snap = snaps.docs[0]
						if (snap && snap.exists) {
							this.$router.push("/my-booking")
						}
					})
				db.collection("users")
					.doc(user.uid)
					.get()
					.then(snap => this.show_admin_button = snap.data().is_staff)
			} else {
				this.$router.push("/")
			}
		})

		db.collection("warehouses")
			.get()
			.then(snaps => (this.warehouses = snaps.docs.map(snap => snap.data())))
			.catch(console.error)
	},
	methods: {
		warehouse_clicked(warehouse_id) {
			this.show_page = false
			setTimeout(() => {
				this.$router.push("/book/" + warehouse_id)
			}, 400)
		},
		
		goToAdmin() {
			this.$router.push('/admin')
		}
	}
}
</script>

<style scoped>
.Warehouses {
	width: 100%;
	height: 100%;
}

.container {
	height: fit-content;
	width: fit-content;
	margin: auto;
}

h1 {
	margin: 30px 0;
}

@keyframes show {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.white-screen {
	width: 100%;
	height: 100%;
	background-color: white;
	position: absolute;
	top: 0;

	display: none;
	opacity: 0;
}

.show {
	display: block;
	animation: show 0.4s forwards;
}
</style>
