import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TransactionInterface } from "../../models/transaction.interface";

@Component({
    selector: 'transaction-form',
    styleUrls: ['transaction-form.component.scss'],
   templateUrl: './transaction-form.component.html'
})

export class TransactionFormComponent {
    @Input()
    detail: TransactionInterface;

    @Output()
    update: EventEmitter<TransactionInterface> = new EventEmitter<TransactionInterface>();

    constructor() {}

    toggleConfirmation(isConfirmed: boolean) {
        this.detail.confirmedAt = Date.now();
    }

    handleSubmit(transaction: TransactionInterface, isValid: boolean | null) {
        if (isValid) {
            this.update.emit(transaction);
        }
    }
}