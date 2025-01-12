import { RequestResponseClient } from "@/types/request";
import { User } from "@/types/user";
import { sendRequest } from "@/utils/request";

interface GetUsersResponseData {
    users: User[]
}

export async function getUsers(name?: string) {
    let endpoint = '/users'

    if (name) {
        endpoint = endpoint.concat(`?name=${name}`)
    }

    const { message, data }: RequestResponseClient<GetUsersResponseData> = await sendRequest({
        endpoint: endpoint,
        method: "GET"
    })

    return {
        message,
        data
    }
}