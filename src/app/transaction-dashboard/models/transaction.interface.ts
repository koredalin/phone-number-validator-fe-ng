export interface TransactionInterface {
    id?: number,
    email: string,
    phoneNumber: string,
    password: string,
    confirmed: false,
    confirmedAt?: number
}