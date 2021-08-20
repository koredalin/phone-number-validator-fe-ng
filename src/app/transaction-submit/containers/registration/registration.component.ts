import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TransactionSubmitService } from "../../transaction-submit.service";
import { TransactionRegistrationInterface } from "../../models/transaction.interface";
import { OtpResponseInterface } from "../../models/otp-response.interface";

@Component({
    selector: 'registration',
    styleUrls: [],
    templateUrl: './registration.component.html'
})


export class RegistrationComponent implements OnInit {
    registration: TransactionRegistrationInterface;
    registrationError: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private transactionService: TransactionSubmitService
    ) {}
    

    ngOnInit() {
        this.registrationError = '';
    }

    onRegistration(event: TransactionRegistrationInterface) {
        this.transactionService
            .registration(event)
            .subscribe((data: OtpResponseInterface) => {
                if (data.response.isSuccess) {
                    this.router.navigate([data.arguments.nextWebPage || '']);
                } else {
                    this.registrationError = data.arguments.errors || '';
                    console.log(data.arguments.errors);
                }

                //this.transaction = Object.assign({}, this.transaction, data);
            });
    }

    goBack() {
        this.router.navigate(['/transactions']);
    }
}