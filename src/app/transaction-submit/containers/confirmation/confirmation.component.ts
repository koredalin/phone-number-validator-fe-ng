import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TransactionSubmitService } from "../../transaction-submit.service";
import { ConfirmationCodeInterface } from "../../models/confirmation-code.interface";
import { OtpResponseInterface } from "../../models/otp-response.interface";

@Component({
    selector: 'confirmation',
    styleUrls: [],
    templateUrl: './confirmation.component.html'
})


export class ConfirmationComponent {
    codeConfirmation: ConfirmationCodeInterface;
    action: string = 'create';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private transactionService: TransactionSubmitService
    ) {}
    

    onCreateTransaction(event: ConfirmationCodeInterface) {
        this.transactionService
            .confirmation(event)
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