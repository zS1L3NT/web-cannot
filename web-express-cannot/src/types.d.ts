export interface User {
	id: string
	email: string
	is_staff: boolean
}

export interface Warehouse {
	id: string
	name: string
	address: string
}

export interface Dock {
	id: string
	name: string
	warehouse_id: string
	load_type: "loading" | "unloading"
}

export interface Booking {
	id: string
	user_id: string
	dock_id: string
	warehouse_id: string
	status: "waiting_arrival" | "busy" | "waiting_departure" | "completed" | "cancelled"
	book_time: number
	end_time: number | null
	eta: string
}