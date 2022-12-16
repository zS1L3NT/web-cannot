declare module "google-distance-matrix" {
	function key(key: string): void
	function mode(mode: "driving" | "walking" | "bicycling" | "transit"): void
	function traffic_model(traffic_model: "best_guess" | "pessimistic" | "optimistic"): void
	function departure_time(departure_time: number): void

	interface Distances {
		destination_addresses: string[]
		origin_addresses: string[]
		status: "OK" | "NOT_FOUND"
		rows: {
			elements: (
				| {
						distance: {
							text: string
							value: number
						}
						duration: {
							text: string
							value: number
						}
						duration_in_traffic: {
							text: string
							value: number
						}
						status: "OK"
				  }
				| {
						status: "NOT_FOUND"
				  }
			)[]
		}[]
	}
	function matrix(
		origins: string[],
		destinations: string[],
		callback: (err: Error | undefined, distances: Distances) => void
	): void
}