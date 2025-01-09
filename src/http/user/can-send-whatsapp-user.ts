import { RequestResponseClient } from "@/types/request"
import { sendRequest } from "@/utils/request"

interface CanSendWhatsappUserProps {
    userId: string
}

export async function canSendWhatsappUser({ userId }: CanSendWhatsappUserProps) {
    const { message }: RequestResponseClient<null> = await sendRequest({
        endpoint: `/users/${userId}/can-send-whatsapp`,
        method: "PATCH"
    })

    return {
        message
    }
}