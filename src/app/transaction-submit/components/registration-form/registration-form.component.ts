import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { TransactionRegistrationInterface } from "../../models/transaction-registration.interface";
import { CountryInterface } from "src/assets/nomenclatures/models/country.interface";

const PHONE_NUMBER_MASK = '0 000 000000';
const BULGARIAN_PHONE_CODE = '359';

@Component({
    selector: 'registration-form',
    styleUrls: ['registration-form.component.scss'],
    templateUrl: './registration-form.component.html'
})

export class RegistrationFormComponent implements OnInit {
    @Input()
    detail: TransactionRegistrationInterface;
    @Input()
    countries: Array<CountryInterface>;
    @Input()
    registrationError: string;

    @Output()
    update: EventEmitter<TransactionRegistrationInterface> = new EventEmitter<TransactionRegistrationInterface>();

    phoneNumberMask: string = '';

    constructor() {}

    
    ngOnInit() {
        this.detail = {
            email: '',
            phoneCode: null,
            phoneNumber: '',
            password: ''
        };
        this.registrationError = '';
    }

    toggleMask(phoneNumberValue: string) {
        if (this.isLeadingZeroString(phoneNumberValue)) {
            this.phoneNumberMask = PHONE_NUMBER_MASK;
            this.detail.phoneCode = BULGARIAN_PHONE_CODE;
        } else {
            this.phoneNumberMask = '';
        }
    }

    setPhoneNumberMask(phoneCodeValue: string) {
        if (
            phoneCodeValue !== BULGARIAN_PHONE_CODE
            && this.isLeadingZeroString(this.detail.phoneNumber)
        ) {
            this.phoneNumberMask = '';
            this.detail.phoneNumber = this.detail.phoneNumber.substring(1);
        }
    }

    handleSubmit(transaction: TransactionRegistrationInterface, isValid: boolean | null) {
        if (isValid) {
            this.update.emit(transaction);
        }
    }

    private isLeadingZeroString(phoneNumberValue: string): boolean {
        return (phoneNumberValue.length || 0) > 0 && phoneNumberValue.substring(0, 1) === '0';
    }

    getFinalAssembledPhoneNumber(): string {
        let phoneNum = this.detail.phoneNumber;
        if (
            this.detail.phoneCode === BULGARIAN_PHONE_CODE
            && this.isLeadingZeroString(phoneNum)
        ) {
            return (this.detail.phoneCode || '')+this.detail.phoneNumber.substring(1);
        }
        
        return (this.detail.phoneCode || '')+this.detail.phoneNumber;
    }
}