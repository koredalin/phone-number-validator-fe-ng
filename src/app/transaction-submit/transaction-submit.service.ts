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
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        let options = {
            "headers": headers
        };

        return this.httpClient
            .post<OtpResponseInterface>(url, transaction, options);
    }

    confirmation(codeConfirmation: ConfirmationCodeInterface): Observable<OtpResponseInterface> {
        let urlEnd = this.getUrlEnd(this.router.url);
        let url = OTP_API + API_CODE_CONFIRMATION + '/' + urlEnd;
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        let options = {
            "headers": headers
        };

        return this.httpClient
            .post<OtpResponseInterface>(url, codeConfirmation, options);
    }

    reset(): Observable<OtpResponseInterface> {
        let urlEnd = this.getUrlEnd(this.router.url);
        let url = OTP_API + API_CODE_CONFIRMATION_RESET + '/' + urlEnd;
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        let options = {
            "headers": headers
        };

        return this.httpClient
            .get<OtpResponseInterface>(url, options);
    }

    getTransaction(transactionInfo: TransactionInfoInterface): Observable<OtpResponseInterface> {
        let url = OTP_API + API_TRANSACTION_INFO + '/' + transactionInfo.transactionId;
        return this.httpClient
            .get<OtpResponseInterface>(url);
    }

    public getCountries(): Observable<any> {
        return this.httpClient.get("./../../assets/nomenclatures/countries.json");
    }

    private getUrlEnd(urlStr: string): string {
        let urlArr = urlStr.split("/") || [];

        return (urlArr[urlArr.length - 1] || '');
    }
}