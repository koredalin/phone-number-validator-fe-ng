import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params, ActivatedRouteSnapshot } from "@angular/router";
import { TransactionDashboardService } from "../../transaction-dashboard.service";
import { TransactionInterface } from "../../models/transaction.interface";

@Component({
    selector: 'transaction-editor',
    styleUrls: [],
    templateUrl: './transaction-editor.component.html'
})


export class TransactionEditorComponent implements OnInit {
    transaction: TransactionInterface;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private transactionService: TransactionDashboardService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((data: Params) => {
            this.transactionService
                .getTransaction(data.id)
                .subscribe((data: TransactionInterface) => this.transaction = data);
        });
    }

    onUpdateTransaction(event: TransactionInterface) {
        this.transactionService
            .updateTransaction(event)
            .subscribe((data: TransactionInterface) => {
                this.transaction = Object.assign({}, this.transaction, event);
            });
    }

    goBack() {
        this.router.navigate(['/transactions']);
    }
}