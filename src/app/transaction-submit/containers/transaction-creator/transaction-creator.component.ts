import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TransactionDashboardService } from "../../transaction-dashboard.service";
import { TransactionInterface } from "../../models/transaction.interface";

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
            .subscribe((data: TransactionInterface) => {
                this.router.navigate(['/transactions/view', data.id]);
                //this.transaction = Object.assign({}, this.transaction, data);
            });
    }

    goBack() {
        this.router.navigate(['/transactions']);
    }
}