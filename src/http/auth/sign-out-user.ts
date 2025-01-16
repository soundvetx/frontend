import { RequestResponseClient } from "@/types/request";
import { sendRequest } from "@/utils/request";

export async function signOutUser() {
    const { message }: RequestResponseClient<null> = await sendRequest({
        endpoint: "/auth/sign-out",
        method: "POST"
    })

    return {
        message
    }
}