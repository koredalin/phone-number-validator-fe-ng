import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TransactionSubmitService } from "../../transaction-submit.service";
import { TransactionInfoInterface } from "../../models/transaction-info.interface";
import { OtpResponseInterface } from "../../models/otp-response.interface";
import { TransactionSubmitUrls } from "../../transaction-submit-urls.component";

@Component({
    selector: 'info',
    styleUrls: [],
    templateUrl: './info.component.html'
})


export class InfoComponent implements OnInit {
    transactionInfo: TransactionInfoInterface;
    infoError: string;
    response: OtpResponseInterface | null;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private transactionService: TransactionSubmitService
    ) {}
    

    ngOnInit() {
        this.infoError = '';
        this.response = null;
    }

    onGetInfo(event: TransactionInfoInterface) {
        if (typeof event.password !== 'undefined' && (event.password || '').length) {
            this.transactionService
                .getTransactionDetailedInfo(event)
                .subscribe(
                    (responseContent: OtpResponseInterface) => {
                        console.log(responseContent);
                        this.response = responseContent;
                    },
                    (error) => {
                      this.infoError = error?.error?.arguments.errors || (JSON.stringify(error || 'UNKNOWN ERROR'));
                    }
                );
            return;
        }

        this.transactionService
            .getTransaction(event)
            .subscribe(
                (responseContent: OtpResponseInterface) => {
                    console.log(responseContent);
                    this.response = responseContent;
                },
                (error) => {
                  this.infoError = error?.error?.arguments.errors || (JSON.stringify(error || 'UNKNOWN ERROR'));
                }
            );
    }

    goBack() {
        this.router.navigate([TransactionSubmitUrls.TRANSACTION_HOME]);
    }
}