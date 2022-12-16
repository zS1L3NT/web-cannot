import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'Login',
		component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
	},
	{
		path: '/warehouses',
		name: 'Warehouses',
		component: () => import(/* webpackChunkName: "Warehouses" */ '../views/Warehouses.vue')
	},
	{
		path: '/admin',
		name: 'Admin',
		component: () => import(/* webpackChunkName: "Admin" */ '../views/Admin.vue')
	},
	{
		path: '/book/:warehouse_id',
		name: 'Book',
		component: () => import(/* webpackChunkName: "Booking" */ '../views/Book.vue')
	},
	{
		path: "/my-booking",
		name: "MyBooking",
		component: () => import(/* webpackChunkName: "MyBooking" */ '../views/MyBooking.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
