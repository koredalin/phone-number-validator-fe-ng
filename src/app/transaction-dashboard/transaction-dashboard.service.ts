import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TransactionInterface } from "./models/transaction.interface";
import { Observable } from "rxjs";


const TRANSACTION_API = 'http://localhost:3000/transactions';

@Injectable()
export class TransactionDashboardService {
    constructor(private httpClient: HttpClient) {}

    getTransactions(): Observable<TransactionInterface[]> {
        return this.httpClient
            .get<TransactionInterface[]>(TRANSACTION_API);
    }

    getTransaction(id: number): Observable<TransactionInterface> {
        let url = TRANSACTION_API+'/'+id;
        return this.httpClient
            .get<TransactionInterface>(url);
    }
}