import { RequestErrorClient, RequestMessage } from "@/types/request"
import { Request } from "@/types/request"

export async function sendRequest({ endpoint, method, data }: Request) {
	const token = localStorage.getItem("soundvetx_token")
	const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
		method,
		headers: {
			"Content-Type": "application/json",
			"Authorization": token ? `Bearer ${token}` : ""
		},
		body: JSON.stringify(data)
	})

	const responseData = await response.json()

	if (response.ok) {
		return responseData
	} else {
		throw {
			message: responseData.message as RequestMessage,
			status: response.status
		} as RequestErrorClient
	}
}