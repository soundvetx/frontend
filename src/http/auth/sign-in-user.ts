import { Login } from "@/schemas/login-schema";
import { RequestResponseClient } from "@/types/request";
import { User } from "@/types/user";
import { sendRequest } from "@/utils/request";

interface SignInResponseData {
    user: User;
    token: string;
}

export async function signInUser({ email, password }: Login) {
    const { message, data }: RequestResponseClient<SignInResponseData> = await sendRequest({
        endpoint: "/auth/sign-in",
        method: "POST",
        data: {
            email,
            password
        }
    })

    return {
        message,
        data
    }
}