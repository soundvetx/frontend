import { UserCreateForm } from "@/schemas/user-schema";
import { RequestResponseClient } from "@/types/request";
import { User } from "@/types/user";
import { sendRequest } from "@/utils/request";

interface CreateUserResponseData {
    user: User
}

export async function createUser({ type, name, email, password, confirmPassword, ...props }: UserCreateForm) {
    const { message, data }: RequestResponseClient<CreateUserResponseData> = await sendRequest({
        endpoint: "/users",
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