export interface OtpResponseInterface {
    "response": {
        "isSuccess": boolean,
        "email?": string,
        "phoneNumber?": number
    },
    "arguments": {
        "nextWebPage": string,
        "errors": string
    }
}