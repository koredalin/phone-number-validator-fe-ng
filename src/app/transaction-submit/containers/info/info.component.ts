import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { TransactionSubmitService } from "../../transaction-submit.service";
import { TransactionInfoInterface } from "../../models/transaction-info.interface";
import { OtpResponseInterface } from "../../models/otp-response.interface";
import { TransactionSubmitUrls } from "../../transaction-submit-urls.component";

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
                .pipe(takeUntil(this.ngUnsubscribe))
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
            .pipe(takeUntil(this.ngUnsubscribe))
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
        this.router.navigate([TransactionSubmitUrls.HOME]);
    }
    
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}