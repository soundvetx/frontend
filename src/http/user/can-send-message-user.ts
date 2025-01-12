import { RequestResponseClient } from "@/types/request"
import { sendRequest } from "@/utils/request"

interface CanSendMessageUserProps {
    userId: string
}

export async function canSendMessageUser({ userId }: CanSendMessageUserProps) {
    const { message }: RequestResponseClient<null> = await sendRequest({
        endpoint: `/users/${userId}/can-send-message`,
        method: "PATCH"
    })

    return {
        message
    }
}