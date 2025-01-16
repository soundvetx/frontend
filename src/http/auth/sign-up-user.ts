import { UserCreateForm } from "@/schemas/user-schema";
import { RequestResponseClient } from "@/types/request";
import { User } from "@/types/user";
import { sendRequest } from "@/utils/request";

interface SignUpResponseData {
    user: User
}

export async function signUpUser({ type, name, email, password, confirmPassword, ...props }: UserCreateForm) {
    const { message, data }: RequestResponseClient<SignUpResponseData> = await sendRequest({
        endpoint: "/auth/sign-up",
        method: "POST",
        data: {
            type,
            name,
            email,
            password,
            confirmPassword,
            ...props
        }
    })

    return {
        message,
        data
    }
}