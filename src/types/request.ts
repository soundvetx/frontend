export type Request = {
	endpoint: string
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
	data?: any
	token?: string
}

export type RequestMessage = {
	serverMessage: string
	clientMessage: string
}

export interface RequestResponse<T> {
	message: RequestMessage
	data?: T
}

export interface RequestError extends RequestResponse<null> {}

export interface RequestResponseClient<T> {
	message: RequestMessage
	data: T
}

export interface RequestErrorClient {
	message: RequestMessage,
	status: number
}
