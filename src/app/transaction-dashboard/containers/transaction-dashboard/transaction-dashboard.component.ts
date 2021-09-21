import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TransactionInterface } from "../../models/transaction.interface";
import { TransactionDashboardService } from "../../transaction-dashboard.service";
import { TransactionSubmitUrls } from "src/app/transaction-submit/transaction-submit-urls.component";

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

    handleEdit(event: TransactionInterface) {
        this.router.navigate(['/transactions/edit', event.id]);
    }

    handleView(event: TransactionInterface) {
        this.router.navigate(['/transactions', event.id]);
    }

    goToSingleTransactionOperations() {
        this.router.navigate([TransactionSubmitUrls.TRANSACTION_HOME]);
    }
}