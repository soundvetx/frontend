import { RequestResponseClient } from "@/types/request";
import { sendRequest } from "@/utils/request";

interface RefreshTokenRequest {
    refreshToken: string
}

interface RefreshTokenResponseData {
    token: string
    refreshToken: string
}

export async function refreshUserToken({ refreshToken }: RefreshTokenRequest) {
    const { message, data }: RequestResponseClient<RefreshTokenResponseData> = await sendRequest({
        endpoint: "/auth/refresh-token",
        method: "POST",
        token: refreshToken,
    })

    return {
        message,
        data
    }
}