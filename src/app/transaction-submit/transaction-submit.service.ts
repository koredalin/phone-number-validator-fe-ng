import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { TransactionRegistrationInterface } from "./models/transaction-registration.interface";
import { ConfirmationCodeInterface } from "./models/confirmation-code.interface";
import { TransactionInfoInterface } from "./models/transaction-info.interface";
import { OtpResponseInterface } from "./models/otp-response.interface";
import { Observable } from "rxjs";

// API links
const OTP_API = 'http://localhost:6886';
const API_REGISTRATION = '/registration/phone-code-number';
const API_CODE_CONFIRMATION = '/confirmation';
const API_CODE_CONFIRMATION_RESET = '/reset-code';
const API_TRANSACTION_INFO = '/transaction-info';
const API_TRANSACTION_DETAILED_INFO = '/transaction-detailed-info';

@Injectable()
export class TransactionSubmitService {
    constructor(
        private router: Router,
        private httpClient: HttpClient
    ) { }

    getTransactions(): Observable<TransactionRegistrationInterface[]> {
        return this.httpClient
            .get<TransactionRegistrationInterface[]>(OTP_API);
    }

    registration(transaction: TransactionRegistrationInterface): Observable<OtpResponseInterface> {
        let url = OTP_API + API_REGISTRATION;

        return this.httpClient
            .post<OtpResponseInterface>(url, transaction, this.getDefaultHttpRequestOptions());
    }

    confirmation(codeConfirmation: ConfirmationCodeInterface): Observable<OtpResponseInterface> {
        let urlEnd = this.getUrlEnd(this.router.url);
        let url = OTP_API + API_CODE_CONFIRMATION + '/' + urlEnd;

        return this.httpClient
            .post<OtpResponseInterface>(url, codeConfirmation, this.getDefaultHttpRequestOptions());
    }

    reset(): Observable<OtpResponseInterface> {
        let transactionId = this.getUrlEnd(this.router.url);
        let url = OTP_API + API_CODE_CONFIRMATION_RESET + '/' + transactionId;

        return this.httpClient
            .get<OtpResponseInterface>(url, this.getDefaultHttpRequestOptions());
    }

    getTransaction(transactionInfo: TransactionInfoInterface): Observable<OtpResponseInterface> {
        let url = OTP_API + API_TRANSACTION_INFO + '/' + transactionInfo.transactionId;
        
        return this.httpClient
            .get<OtpResponseInterface>(url, this.getDefaultHttpRequestOptions());
    }

    getTransactionDetailedInfo(transactionInfo: TransactionInfoInterface): Observable<OtpResponseInterface> {
        let url = OTP_API + API_TRANSACTION_DETAILED_INFO + '/' + transactionInfo.transactionId;
        
        return this.httpClient
            .post<OtpResponseInterface>(url, transactionInfo, this.getDefaultHttpRequestOptions());
    }

    getTransactionByUrlTransactionId(): Observable<OtpResponseInterface> {
        let transactionId = this.getUrlEnd(this.router.url);
        let url = OTP_API + API_TRANSACTION_INFO + '/' + transactionId;

        return this.httpClient
            .get<OtpResponseInterface>(url, this.getDefaultHttpRequestOptions());
    }

    public getCountries(): Observable<any> {
        return this.httpClient.get("./../../assets/nomenclatures/countries.json");
    }

    private getUrlEnd(urlStr: string): string {
        let urlArr = urlStr.split("/") || [];

        return (urlArr[urlArr.length - 1] || '');
    }

    private getDefaultHttpRequestHeaders(): HttpHeaders {
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        
        return headers;
    }

    private getDefaultHttpRequestOptions(): Object {
        let options = {
            "headers": this.getDefaultHttpRequestHeaders()
        };
        
        return options;
    }
}