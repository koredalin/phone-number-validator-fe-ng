import { Component, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { TransactionInterface } from "../../models/transaction.interface";

@Component({
    selector: 'transaction-detail',
    styleUrls: ['transaction-detail.component.css'],
   templateUrl: './transaction-detail.component.html'
})

export class TransactionDetailComponent implements OnChanges {
    @Input()
    detail: TransactionInterface;

    @Output()
    view: EventEmitter<TransactionInterface> = new EventEmitter<TransactionInterface>();

    constructor() {}

    goToTransaction() {
        this.view.emit(this.detail);
    }

    ngOnChanges(changes: any) {
        if (changes.detail) {
            this.detail = Object.assign({}, changes.detail.currentValue);
        }
    }
}