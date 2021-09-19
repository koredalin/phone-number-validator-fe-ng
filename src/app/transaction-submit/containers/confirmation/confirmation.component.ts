import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TransactionSubmitService } from "../../transaction-submit.service";
import { ConfirmationCodeInterface } from "../../models/confirmation-code.interface";
import { OtpResponseInterface } from "../../models/otp-response.interface";
import { TransactionSubmitUrls } from "../../transaction-submit-urls.component";

@Component({
    selector: 'confirmation',
    styleUrls: [],
    templateUrl: './confirmation.component.html'
})


export class ConfirmationComponent implements OnInit {
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
                (responseContent: OtpResponseInterface) => {
                    console.log(responseContent);
                    if (responseContent.response.transactionStatus === 'confirmed') {
                        this.confirmationError = responseContent.response.error || '';
                    } else {
                        this.router.navigate([TransactionSubmitUrls.TRANSACTION_INFO + responseContent.response?.transactionId || '']);
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
                (responseContent: OtpResponseInterface) => {
                    if (responseContent.response.transactionStatus === 'confirmed') {
                        this.confirmationError = responseContent.response.error || '';
                    } else {
                        this.resetSuccess = true;
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