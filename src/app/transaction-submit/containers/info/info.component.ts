import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { TransactionSubmitService } from "../../transaction-submit.service";
import { TransactionInfoInterface } from "../../models/transaction-info.interface";
import { OtpResponseInterface } from "../../models/otp-response.interface";
import { TransactionSubmitUrls } from "../../transaction-submit-urls.component";

const TRANSACTION_STATUS_AWAITING_REQUEST = 'awaiting_request';

@Component({
    selector: 'info',
    styleUrls: [],
    templateUrl: './info.component.html'
})

export class InfoComponent implements OnInit, OnDestroy {
    transactionInfo: TransactionInfoInterface;
    infoError: string;
    response: OtpResponseInterface | null;
    private ngUnsubscribe = new Subject();
    showConfirmationLink: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private transactionService: TransactionSubmitService
    ) {}
    

    ngOnInit() {
        this.infoError = '';
        this.response = null;
        this.showConfirmationLink = false;
    }

    onGetInfo(event: TransactionInfoInterface) {
        if (typeof event.password !== 'undefined' && (event.password || '').length) {
            this.transactionService
                .getTransactionDetailedInfo(event)
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(
                    (responseContent: OtpResponseInterface) => {
                        this.response = responseContent;
                        this.showConfirmationLink = (this.response?.response?.transactionStatus || '') === TRANSACTION_STATUS_AWAITING_REQUEST ? true : false;
                    },
                    (error) => {
                      this.infoError = error?.error?.arguments.errors || (JSON.stringify(error || 'UNKNOWN ERROR'));
                    }
                );
            return;
        }

        this.transactionService
            .getTransaction(event)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                (responseContent: OtpResponseInterface) => {
                    this.response = responseContent;
                    this.showConfirmationLink = (this.response?.response?.transactionStatus || '') === TRANSACTION_STATUS_AWAITING_REQUEST ? true : false;
                },
                (error) => {
                  this.infoError = error?.error?.arguments.errors || (JSON.stringify(error || 'UNKNOWN ERROR'));
                }
            );
    }

    goBack() {
        this.router.navigate([TransactionSubmitUrls.HOME]);
    }

    goToConfirmation() {
        this.router.navigate([TransactionSubmitUrls.HOME + TransactionSubmitUrls.CONFIRMATION + '/' + this.response?.response?.transactionId || '']);
    }
    
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}