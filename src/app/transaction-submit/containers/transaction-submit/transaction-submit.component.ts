import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TransactionSubmitUrls } from "../../transaction-submit-urls.component";
import { AppUrls } from "src/app/app-urls.component";

@Component({
    selector: 'transaction-submit',
    styleUrls: [],
    templateUrl: './transaction-submit.component.html'
})


export class TransactionSubmitComponent {
    constructor(
        private router: Router
    ) {}

    goToCreateTransaction() {
        this.router.navigate([TransactionSubmitUrls.HOME + TransactionSubmitUrls.REGISTRATION]);
    }

    goToTransactionInfo() {
        this.router.navigate([TransactionSubmitUrls.HOME + TransactionSubmitUrls.TRANSACTION_INFO]);
    }

    // handleView(event: TransactionInterface) {
    //     this.router.navigate(['/transactions', event.id]);
    // }

    goBack() {
        this.router.navigate([AppUrls.TRANSACTIONS_HOME]);
    }
}