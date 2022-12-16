<template>
	<div class="WarehouseEditable container">
		<div class="row">
			<div class="warehouse-header" @click="toggle_dropdown(warehouse.id)">
				<h3>{{ warehouse.name || "" }}</h3>
				<p>{{ warehouse.address || "" }}</p>
			</div>

			<div class="dropdown" :style="'display: ' + display">
				<div class="container">
					<div class="row">
						<slot />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"

export default {
	name: "WarehouseEditable",
	props: {
		warehouse: Object
	},
	data() {
		return {
			display: "none"
		}
	},
	methods: {
		toggle_dropdown() {
			if (this.display === "none") {
				this.display = "block"
			} else {
				this.display = "none"
			}
		}
	}
}
</script>

<style>
.WarehouseEditable > .row {
	margin: auto;
}

@keyframes dropdown {
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

.warehouse-header {
	max-width: 100%;
	min-width: 20rem;
	height: 6rem;
	margin: 2rem auto 1rem auto;
	padding-top: 1.5rem;
	box-shadow: 0 2px 6px rgb(0, 0, 0, 0.3);
	cursor: pointer;
}

.warehouse-header > h3 {
	font-weight: bold;
	font-size: large;
}

.dropdown {
	animation-name: dropdown;
	animation-duration: 0.4s;
}

.dropdown > .container {
	padding-top: 0.5rem;
	width: 100%;
}

@media (min-width: 768px) {
	.warehouse-header {
		max-width: 100%;
		min-width: 40rem;
		height: 6rem;
		margin: 2rem auto 1rem auto;
		padding-top: 1.5rem;
		box-shadow: 0 2px 6px rgb(0, 0, 0, 0.3);
	}
}
</style>
