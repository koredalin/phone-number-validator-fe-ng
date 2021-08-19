import { Component, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { TransactionRegistrationInterface } from "../../models/transaction.interface";
import { Router } from "@angular/router";

@Component({
    selector: 'transaction-detail',
    styleUrls: ['transaction-detail.component.scss'],
    templateUrl: './transaction-detail.component.html'
})

export class TransactionDetailComponent implements OnChanges {
    @Input()
    detail: TransactionRegistrationInterface;

    @Output()
    edit: EventEmitter<TransactionRegistrationInterface> = new EventEmitter<TransactionRegistrationInterface>();

    @Output()
    view: EventEmitter<TransactionRegistrationInterface> = new EventEmitter<TransactionRegistrationInterface>();

    constructor(
        private router: Router
    ) {}

    goToEditTransaction() {
        this.edit.emit(this.detail);
        //this.router.navigate(['/transactions/edit', this.detail.id]);
    }

    goToTransaction() {
        this.view.emit(this.detail);
        //this.router.navigate(['/transactions/view', this.detail.id]);
    }

    ngOnChanges(changes: any) {
        if (changes.detail) {
            this.detail = Object.assign({}, changes.detail.currentValue);
        }
    }
}