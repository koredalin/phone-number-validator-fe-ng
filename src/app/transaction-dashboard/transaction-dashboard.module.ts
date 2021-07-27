import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

// Containers
import { TransactionDashboardComponent } from "./containers/transaction-dashboard/transaction-dashboard.component";

// Components

// Services
import { TransactionDashboardService } from "./transaction-dashboard.service";

const routes = [
    {
        path: '',
        component: TransactionDashboardComponent
    }
];

@NgModule({
    declarations: [
        // Containers
        TransactionDashboardComponent

        // Components

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