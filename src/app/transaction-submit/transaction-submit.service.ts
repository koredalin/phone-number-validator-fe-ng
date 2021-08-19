import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TransactionRegistrationInterface } from "./models/transaction.interface";
import { ConfirmationCodeInterface } from "./models/confirmation-code.interface";
import { OtpResponseInterface } from "./models/otp-response.interface";
import { Observable } from "rxjs";


const TRANSACTION_API = 'http://localhost:3000/transactions';

@Injectable()
export class TransactionSubmitService {
    constructor(private httpClient: HttpClient) {}

    getTransactions(): Observable<TransactionRegistrationInterface[]> {
        return this.httpClient
            .get<TransactionRegistrationInterface[]>(TRANSACTION_API);
    }

    registration(transaction: TransactionRegistrationInterface): Observable<OtpResponseInterface> {
        let url = TRANSACTION_API;
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        let options = {
            "headers": headers
        };
        
        return this.httpClient
            .post<OtpResponseInterface>(url, transaction, options);
    }

    confirmation(transaction: ConfirmationCodeInterface): Observable<OtpResponseInterface> {
        let url = TRANSACTION_API;
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        let options = {
            "headers": headers
        };
        
        return this.httpClient
            .post<OtpResponseInterface>(url, transaction, options);
    }

    getTransaction(id: number): Observable<TransactionRegistrationInterface> {
        let url = TRANSACTION_API+'/'+id;
        return this.httpClient
            .get<TransactionRegistrationInterface>(url);
    }
}