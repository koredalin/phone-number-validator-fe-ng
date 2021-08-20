import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { TransactionRegistrationInterface } from "./models/transaction.interface";
import { ConfirmationCodeInterface } from "./models/confirmation-code.interface";
import { OtpResponseInterface } from "./models/otp-response.interface";
import { Observable } from "rxjs";

// API links
const OTP_API = 'http://localhost:6886';
const API_REGISTRATION = '/registration';
const API_CODE_CONFIRMATION = '/confirmation';
const API_CODE_CONFIRMATION_RESET = '/reset';

@Injectable()
export class TransactionSubmitService {
    constructor(
        private router: Router,
        private httpClient: HttpClient
    ) {}

    getTransactions(): Observable<TransactionRegistrationInterface[]> {
        return this.httpClient
            .get<TransactionRegistrationInterface[]>(OTP_API);
    }

    registration(transaction: TransactionRegistrationInterface): Observable<OtpResponseInterface> {
        let url = OTP_API+API_REGISTRATION;
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
        let url = OTP_API+this.router.url;
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
        let urlArr = this.router.url.split("/") || [];
        console.log(urlArr);
        let url = OTP_API+API_CODE_CONFIRMATION_RESET+'/'+(urlArr[urlArr.length - 1] || '0');
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        let options = {
            "headers": headers
        };
        
        return this.httpClient
            .get<OtpResponseInterface>(url, options);
    }

    getTransaction(id: number): Observable<TransactionRegistrationInterface> {
        let url = OTP_API+'/'+id;
        return this.httpClient
            .get<TransactionRegistrationInterface>(url);
    }
}