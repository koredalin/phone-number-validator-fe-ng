import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ConfirmationCodeInterface } from "../../models/confirmation-code.interface";

@Component({
    selector: 'confirmation-form',
    styleUrls: ['confirmation-form.component.scss'],
   templateUrl: './confirmation-form.component.html'
})

export class ConfirmationFormComponent {
    @Input()
    detail: ConfirmationCodeInterface;

    @Input()
    action: string;

    @Output()
    update: EventEmitter<ConfirmationCodeInterface> = new EventEmitter<ConfirmationCodeInterface>();

    constructor() {}

    handleSubmit(transaction: ConfirmationCodeInterface, isValid: boolean | null) {
        if (isValid) {
            this.update.emit(transaction);
        }
    }
}