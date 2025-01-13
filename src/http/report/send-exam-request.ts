import { RequestResponseClient } from "@/types/request";
import { sendRequest } from "@/utils/request";

export interface SendExamRequest {
	veterinarianClinic: string
	veterinarianName: string
	patientName: string
	examRequestUrl: string
}

export async function sendExamRequest({ veterinarianClinic, veterinarianName, patientName, examRequestUrl }: SendExamRequest) {
    const { message }: RequestResponseClient<boolean> = await sendRequest({
        endpoint: "/exam-requests/send",
        method: "POST",
        data: {
            veterinarianClinic,
            veterinarianName,
            patientName,
            examRequestUrl
        }
    })

    return {
        message
    }
}
