import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

// Containers

// Components
import { TransactionSubmitComponent } from "./containers/transaction-submit/transaction-submit.component";
import { TransactionDetailComponent } from "./components/transaction-detail/transaction-detail.component";
import { RegistrationComponent } from "./containers/registration/registration.component";
import { TransactionViewerComponent } from "./containers/transaction-viewer/transaction-viewer.component";
import { RegistrationFormComponent } from "./components/registration-form/registration-form.component";
import { ConfirmationComponent } from "./containers/confirmation/confirmation.component";
import { ConfirmationFormComponent } from "./components/confirmation-form/confirmation-form.component";

// Services
import { TransactionSubmitService } from "./transaction-submit.service";

const routes = [
    {
        "path": 'transaction-submit',
        "children": [
            {
                path: '',
                component: TransactionSubmitComponent
            },
            {
                path: 'registration',
                component: RegistrationComponent
            },
            {
                path: 'confirmation/:transactionId',
                component: ConfirmationComponent
            },
            {
                path: 'view/:id',
                component: TransactionViewerComponent
            },
        ]
    }
];

@NgModule({
    declarations: [
        // Containers

        // Components
        TransactionDetailComponent,
        RegistrationComponent,
        ConfirmationComponent,
        TransactionViewerComponent,
        RegistrationFormComponent,
        ConfirmationFormComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        TransactionSubmitService
    ]
})

export class TransactionSubmitModule {}