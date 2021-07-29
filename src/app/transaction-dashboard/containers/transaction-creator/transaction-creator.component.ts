import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params, ActivatedRouteSnapshot } from "@angular/router";
import { TransactionDashboardService } from "../../transaction-dashboard.service";
import { TransactionInterface } from "../../models/transaction.interface";

@Component({
    selector: 'transaction-creator',
    styleUrls: [],
    templateUrl: './transaction-creator.component.html'
})


export class TransactionCreatorComponent implements OnInit {
    transaction: TransactionInterface;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private transactionService: TransactionDashboardService
    ) {}

    ngOnInit() {
        this.transaction = {
            "id": null,
            "email": "",
            "phoneNumber": "",
            "password": "",
            "confirmed": false
        };
        // this.route.params.subscribe((data: Params) => {
        //     this.transactionService
        //         .getTransaction(data.id)
        //         .subscribe((data: TransactionInterface) => this.transaction = data);
        // });
    }

    onCreateTransaction(event: TransactionInterface) {
        this.transactionService
            .createTransaction(event)
            .subscribe((data: TransactionInterface) => {
                this.transaction = Object.assign({}, this.transaction, event);
            });
    }

    goBack() {
        this.router.navigate(['/transactions']);
    }
}