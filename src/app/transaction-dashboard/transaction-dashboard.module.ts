import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

// Containers
import { TransactionDashboardComponent } from "./containers/transaction-dashboard/transaction-dashboard.component";

// Components
import { TransactionDetailComponent } from "./components/transaction-detail/transaction-detail.component";
import { TransactionViewerComponent } from "./containers/transaction-viewer/transaction-viewer.component";
import { TransactionFormComponent } from "./components/transaction-form/transaction-form.component";

// Services
import { TransactionDashboardService } from "./transaction-dashboard.service";

const routes = [
    {
        "path": 'transactions',
        "children": [
            {
                path: '',
                component: TransactionDashboardComponent
            },
            {
                path: ':id',
                component: TransactionViewerComponent
            }
        ]
    }
];

@NgModule({
    declarations: [
        // Containers
        TransactionDashboardComponent,

        // Components
        TransactionDetailComponent,
        TransactionViewerComponent,
        TransactionFormComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        TransactionDashboardService
    ]
})

export class TransactionDashboardModule {}