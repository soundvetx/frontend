import { RequestResponseClient } from "@/types/request"
import { User } from "@/types/user"
import { sendRequest } from "@/utils/request"

interface RefreshUserData {
    user: User
}

export async function refreshUserData() {
    const { message, data }: RequestResponseClient<RefreshUserData> = await sendRequest({
        endpoint: "/users/me",
        method: "GET",
    })

    return {
        message,
        data
    }
}