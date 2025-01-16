import { RequestResponseClient } from "@/types/request"
import { sendRequest } from "@/utils/request"

interface RestoreUserProps {
    userId: string
}

export async function restoreUser({ userId }: RestoreUserProps) {
    const { message }: RequestResponseClient<undefined> = await sendRequest({
        endpoint: `/users/${userId}/restore`,
        method: "PATCH"
    })

    return {
        message
    }
}