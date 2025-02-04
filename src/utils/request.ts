import { refreshUserToken } from "@/http/auth/refresh-user-token"
import { RequestErrorClient, RequestMessage } from "@/types/request"
import { Request } from "@/types/request"

export async function sendRequest({ endpoint, method, data, token }: Request) {
	const bearerToken = token ?? localStorage.getItem("soundvetx_token")
	const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
		method,
		headers: {
			"Content-Type": "application/json",
			"Authorization": bearerToken ? `Bearer ${bearerToken}` : ""
		},
		body: JSON.stringify(data)
	})

	const responseData = await response.json()

	if (response.ok) {
		return responseData
	} else {
		if (response.status === 401 && endpoint !== "/auth/refresh-token") {
			const refreshToken = localStorage.getItem("soundvetx_refresh_token")

			if (refreshToken) {
				try {
					const { data: refreshTokenData } = await refreshUserToken({ refreshToken })

					localStorage.setItem("soundvetx_token", refreshTokenData.token)
					localStorage.setItem("soundvetx_refresh_token", refreshTokenData.refreshToken)

					return await sendRequest({ endpoint, method, data, token })
				} catch (error) {
					throw error
				}
			}
		}

		throw {
			message: responseData.message as RequestMessage,
			status: response.status
		} as RequestErrorClient
	}
}