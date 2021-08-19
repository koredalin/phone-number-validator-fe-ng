import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TransactionDashboardService } from "../../transaction-dashboard.service";
import { TransactionInterface } from "../../models/transaction.interface";
import { OtpResponseInterface } from "../../models/otp-response.interface";

@Component({
    selector: 'transaction-creator',
    styleUrls: [],
    templateUrl: './transaction-creator.component.html'
})


export class TransactionCreatorComponent {
    transaction: TransactionInterface;
    action: string = 'create';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private transactionService: TransactionDashboardService
    ) {}
    

    onCreateTransaction(event: TransactionInterface) {
        this.transactionService
            .createTransaction(event)
            .subscribe((data: OtpResponseInterface) => {
                if (data.response.isSuccess) {
                    this.router.navigate([data.arguments.nextWebPage || '']);
                } else {
                    console.log(data.arguments.errors);
                }

                //this.transaction = Object.assign({}, this.transaction, data);
            });
    }

    goBack() {
        this.router.navigate(['/transactions']);
    }
}