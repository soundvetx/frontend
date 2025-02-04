import { ResetPassword } from "@/schemas/reset-password-schema";
import { RequestResponseClient } from "@/types/request";
import { sendRequest } from "@/utils/request";

export async function resetUserPassword({ token, newPassword, confirmNewPassword }: ResetPassword) {
    const { message }: RequestResponseClient<null> = await sendRequest({
        endpoint: "/auth/reset-password",
        method: "PATCH",
        data: {
            token,
            newPassword,
            confirmNewPassword
        }
    })

    return {
        message
    }
}