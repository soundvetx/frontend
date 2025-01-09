import { RequestResponseClient } from "@/types/request";
import { sendRequest } from "@/utils/request";

interface DeleteUserProps {
    userId: string
}

export async function deleteUser({ userId }: DeleteUserProps) {
    const { message }: RequestResponseClient<undefined> = await sendRequest({
        endpoint: `/users/${userId}`,
        method: "DELETE"
    })

    return {
        message
    }
}