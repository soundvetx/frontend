import { RequestResponseClient } from "@/types/request";
import { sendRequest } from "@/utils/request";

export interface SendExamRequest {
	veterinarianClinic: string
	veterinarianName: string
	patientName: string
	reportUrl: string
}

export async function sendExamRequest({ veterinarianClinic, veterinarianName, patientName, reportUrl }: SendExamRequest) {
    const { message }: RequestResponseClient<boolean> = await sendRequest({
        endpoint: "exam-requests/send",
        method: "POST",
        data: {
            veterinarianClinic,
            veterinarianName,
            patientName,
            reportUrl
        }
    })

    return {
        message
    }
}
