import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TransactionRegistrationInterface } from "../../models/transaction-registration.interface";
import { CountryInterface } from "src/assets/nomenclatures/models/country.interface";

@Component({
    selector: 'registration-form',
    styleUrls: ['registration-form.component.scss'],
   templateUrl: './registration-form.component.html'
})

export class RegistrationFormComponent {
    @Input()
    detail: TransactionRegistrationInterface;
    @Input()
    countries: Array<CountryInterface>;

    @Output()
    update: EventEmitter<TransactionRegistrationInterface> = new EventEmitter<TransactionRegistrationInterface>();

    constructor() {}

    handleSubmit(transaction: TransactionRegistrationInterface, isValid: boolean | null) {
        if (isValid) {
            this.update.emit(transaction);
        }
    }
}