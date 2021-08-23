import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TransactionRegistrationInterface } from "../../models/transaction-registration.interface";
import { CountryInterface } from "src/assets/nomenclatures/models/country.interface";

const PHONE_NUMBER_MASK = '0 000 000000';

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

    phoneNumberMask: string = '';

    constructor() {}

    
    toggleMask(phoneNumberValue: string) {
        if ((phoneNumberValue.length || 0) && phoneNumberValue.substring(0, 1) === '0') {
            this.phoneNumberMask = PHONE_NUMBER_MASK;
        } else {
            this.phoneNumberMask = '';
        }
    }

    handleSubmit(transaction: TransactionRegistrationInterface, isValid: boolean | null) {
        if (isValid) {
            this.update.emit(transaction);
        }
    }
}