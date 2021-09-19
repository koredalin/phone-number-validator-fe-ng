import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TransactionSubmitService } from "../../transaction-submit.service";
import { TransactionInfoInterface } from "../../models/transaction-info.interface";
import { OtpResponseInterface } from "../../models/otp-response.interface";

@Component({
    selector: 'info-by-id',
    styleUrls: [],
    templateUrl: './info-by-id.component.html'
})


export class InfoByIdComponent implements OnInit {
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
        this.setInfo();
    }

    setInfo() {
        this.transactionService
            .getTransactionByUrlTransactionId()
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
        this.router.navigate(['/transactions']);
    }
}