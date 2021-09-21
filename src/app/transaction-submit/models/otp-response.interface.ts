export interface OtpResponseInterface {
    "response": {
        transactionId?: number,
        email?: string,
        phoneCode?: number,
        phoneNumber?: number,
        transactionStatus?: string,
        error?: string,
        transactionConfirmedAt?: {
            date: string,
            timezone_type: number,
            timezone: string
        }
    },
    "arguments": {
        "transactionId?": number,
        "nextWebPage": string,
        "errors": string
    }
}