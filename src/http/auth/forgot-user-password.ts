import { ForgotPassword } from "@/schemas/forgot-password-schema";
import { RequestResponseClient } from "@/types/request";
import { sendRequest } from "@/utils/request";

export async function forgotUserPassword({ email }: ForgotPassword) {
    const { message }: RequestResponseClient<null> = await sendRequest({
        endpoint: "/auth/forgot-password",
        method: "POST",
        data: {
            email
        }
    })

    return {
        message
    }
}