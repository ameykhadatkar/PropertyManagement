import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { PropertiesComponent } from '../../properties/properties.component';
import { PropertyEditComponent } from '../../property-edit/property-edit.component';
import { PropertyDetailsComponent } from '../../property-details/property-details.component';
import { RelatedExpenseEditComponent } from '../../related-expense-edit/related-expense-edit.component';
import { CreateRelatedExpenseComponent } from '../../create-related-expense/create-related-expense.component';
import { AssignTenantComponent } from '../../assign-tenant/assign-tenant.component';
import { TransactionsComponent } from '../../transactions/transactions.component';
import { TenantComponent } from '../../tenant/tenant.component';
import { AccountComponent } from '../../account-monitoring/account.component';
// import { TenantRequestComponent } from '../../tenantrequest/tenantrequest.component';
import { EmailComponent } from '../../emailservice/email.component';
import { CreateTransactionComponent } from '../../create-transaction/create-transaction.component';
import { SignupComponent } from '../../signup/signup.component';
import { ExportReportsComponent } from 'app/export-reports/export-reports/export-reports.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'properties',     component: PropertiesComponent },
    { path: 'property/:Id/edit',     component: PropertyEditComponent },
    { path: 'property/:Id',     component: PropertyDetailsComponent },
    { path: 'relatedexpense/:Id',     component: RelatedExpenseEditComponent },
    { path: 'property/:propertyId/relatedexpenses',     component: CreateRelatedExpenseComponent },
    { path: 'property/:propertyId/assign',     component: AssignTenantComponent },
    { path: 'transactions',     component: TransactionsComponent },
    { path: 'tenant',     component: TenantComponent },
    { path: 'account-monitoring',     component: AccountComponent },
    { path: 'emailservice',     component: EmailComponent },
    { path: 'transactions/add',     component: CreateTransactionComponent },
    { path: 'export',     component: ExportReportsComponent }
    // { path: 'tenantrequest',     component: TenantRequestComponent }
];
