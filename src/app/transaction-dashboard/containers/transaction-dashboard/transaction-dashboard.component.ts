import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TransactionInterface } from "../../models/transaction.interface";
import { TransactionDashboardService } from "../../transaction-dashboard.service";

@Component({
    selector: 'transaction-dashboard',
    styleUrls: [],
    templateUrl: './transaction-dashboard.component.html'
})


export class TransactionDashboardComponent implements OnInit {
    transactions: TransactionInterface[] = [];

    constructor(
        private router: Router,
        private transactionService: TransactionDashboardService
    ) {}

    ngOnInit() {
        this.transactionService
            .getTransactions()
            .subscribe((responseData: TransactionInterface[]) => this.transactions = responseData);
    }

    handleView(event: TransactionInterface) {
        this.router.navigate(['/transactions', event.id]);
    }
}