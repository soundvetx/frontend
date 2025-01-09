import { UserUpdateForm } from "@/schemas/user-schema";
import { RequestResponseClient } from "@/types/request";
import { User } from "@/types/user";
import { sendRequest } from "@/utils/request";

interface UpdateUserProps {
    userId: number
    values: UserUpdateForm
}

interface UpdateUserResponseData {
    user: User
}

export async function updateUser({ userId, values }: UpdateUserProps) {
    const { type, name, email, ...props } = values

    const { message, data }: RequestResponseClient<UpdateUserResponseData> = await sendRequest({
        endpoint: `/users/${userId}`,
        method: "PUT",
        data: {
            type,
            name,
            email,
            ...props
        }
    })

    return {
        message,
        data
    }
}