import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { TransactionSubmitService } from "../../transaction-submit.service";
import { TransactionRegistrationInterface } from "../../models/transaction-registration.interface";
import { CountryInterface } from "src/assets/nomenclatures/models/country.interface";
import { OtpResponseInterface } from "../../models/otp-response.interface";
import { TransactionSubmitUrls } from "../../transaction-submit-urls.component";

@Component({
    selector: 'registration',
    styleUrls: [],
    templateUrl: './registration.component.html'
})

export class RegistrationComponent implements OnInit, OnDestroy {
    registration: TransactionRegistrationInterface;
    registrationError: string;
    countries: Array<CountryInterface>;
    private ngUnsubscribe = new Subject();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private transactionService: TransactionSubmitService
    ) {
        this.transactionService.getCountries().subscribe(data => { this.countries = data; });
    }
    

    ngOnInit() {
        this.registrationError = '';
    }

    onRegistration(event: TransactionRegistrationInterface) {
        this.transactionService
            .registration(event)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                (responseContent: OtpResponseInterface) => {
                    this.router.navigate([TransactionSubmitUrls.HOME+TransactionSubmitUrls.CONFIRMATION+'/'+(responseContent.response.transactionId || '')]);
                    //this.transaction = Object.assign({}, this.transaction, data);
                },
                (error) => {
                    this.registrationError = error?.error?.arguments.errors || (JSON.stringify(error || 'UNKNOWN ERROR'));
                }
            );
    }

    goBack() {
        this.router.navigate(['/transactions']);
    }
    
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}