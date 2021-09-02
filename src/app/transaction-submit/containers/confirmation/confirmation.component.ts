import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TransactionSubmitService } from "../../transaction-submit.service";
import { ConfirmationCodeInterface } from "../../models/confirmation-code.interface";
import { OtpResponseInterface } from "../../models/otp-response.interface";

@Component({
    selector: 'confirmation',
    styleUrls: [],
    templateUrl: './confirmation.component.html'
})


export class ConfirmationComponent implements OnInit{
    codeConfirmation: ConfirmationCodeInterface;
    confirmationError: string;
    resetError: string;
    resetSuccess: boolean | null;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private transactionService: TransactionSubmitService
    ) {}
    

    ngOnInit() {
        this.confirmationError = '';
        this.resetSuccess = null;
        this.resetError = '';
    }

    onCodeConfirmation(event: ConfirmationCodeInterface) {
        this.transactionService
            .confirmation(event)
            .subscribe(
                (data: OtpResponseInterface) => {
                    if (data.response.isSuccess) {
                        this.router.navigate(['/transaction-submit'+data.arguments.nextWebPage || '']);
                    } else {
                        this.confirmationError = data.arguments.errors || '';
                    }
                },
                (error) => {
                  this.confirmationError = error?.error?.arguments.errors || (JSON.stringify(error || 'UNKNOWN ERROR'));
                }
            );
    }

    resetCode() {
        this.transactionService
            .reset()
            .subscribe(
                (data: OtpResponseInterface) => {
                    if (data.response.isSuccess) {
                        this.resetSuccess = true;
                    } else {
                        this.resetSuccess = false;
                        this.resetError = data.arguments.errors || '';
                    }
                },
                (error) => {
                this.confirmationError = error?.error?.arguments.errors || (JSON.stringify(error || 'UNKNOWN ERROR'));
                }
            );
    }

    goBack() {
        this.router.navigate(['/transactions']);
    }
}