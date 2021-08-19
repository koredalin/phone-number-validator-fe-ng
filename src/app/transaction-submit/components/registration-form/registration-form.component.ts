import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TransactionRegistrationInterface } from "../../models/transaction.interface";

@Component({
    selector: 'registration-form',
    styleUrls: ['registration-form.component.scss'],
   templateUrl: './registration-form.component.html'
})

export class RegistrationFormComponent {
    @Input()
    detail: TransactionRegistrationInterface;

    @Input()
    action: string;

    @Output()
    update: EventEmitter<TransactionRegistrationInterface> = new EventEmitter<TransactionRegistrationInterface>();

    constructor() {}

    handleSubmit(transaction: TransactionRegistrationInterface, isValid: boolean | null) {
        if (isValid) {
            this.update.emit(transaction);
        }
    }
}