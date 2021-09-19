import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TransactionSubmitUrls } from "../../transaction-submit-urls.component";

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
        this.router.navigate(['/transaction-submit/registration']);
    }

    goToTransactionInfo() {
        this.router.navigate([TransactionSubmitUrls.TRANSACTION_HOME + TransactionSubmitUrls.TRANSACTION_INFO]);
    }

    // handleView(event: TransactionInterface) {
    //     this.router.navigate(['/transactions', event.id]);
    // }

    goBack() {
        this.router.navigate(['/transactions']);
    }
}