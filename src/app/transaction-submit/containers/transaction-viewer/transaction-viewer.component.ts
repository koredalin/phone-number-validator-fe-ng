import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params, ActivatedRouteSnapshot } from "@angular/router";
import { TransactionSubmitService } from "../../transaction-submit.service";
import { TransactionRegistrationInterface } from "../../models/transaction.interface";

@Component({
    selector: 'transaction-viewer',
    styleUrls: [],
    templateUrl: './transaction-viewer.component.html'
})


export class TransactionViewerComponent implements OnInit {
    transaction: TransactionRegistrationInterface;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private transactionService: TransactionSubmitService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((data: Params) => {
            this.transactionService
                .getTransaction(data.id)
                .subscribe((data: TransactionRegistrationInterface) => this.transaction = data);
        });
    }

    goBack() {
        this.router.navigate(['/transactions']);
    }
}