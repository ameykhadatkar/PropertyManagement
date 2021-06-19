import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { PropertiesComponent } from '../../properties/properties.component';
import { PropertyEditComponent } from '../../property-edit/property-edit.component';
import { PropertyDetailsComponent } from '../../property-details/property-details.component';
import { RelatedExpenseEditComponent } from '../../related-expense-edit/related-expense-edit.component';
import { CreateRelatedExpenseComponent } from '../../create-related-expense/create-related-expense.component';
import { TransactionsComponent } from '../../transactions/transactions.component';
import { TenantComponent } from '../../tenant/tenant.component';
import { AccountComponent } from '../../account-monitoring/account.component';
// import { TenantRequestComponent } from '../../tenantrequest/tenantrequest.component';
import { EmailComponent } from '../../emailservice/email.component';
import { CreateTransactionComponent } from '../../create-transaction/create-transaction.component';
import { AssignTenantComponent } from '../../assign-tenant/assign-tenant.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTooltipModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTabsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.cubeGrid,
      backdropBorderRadius: '4px',
    }),
    MatExpansionModule,
    MatSlideToggleModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    PropertiesComponent,
    PropertyEditComponent,
    PropertyDetailsComponent,
    RelatedExpenseEditComponent,
    CreateRelatedExpenseComponent,
    AssignTenantComponent,
    TransactionsComponent,
    CreateTransactionComponent,
    TenantComponent,
    AccountComponent,
    EmailComponent
    // TenantRequestComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})

export class AdminLayoutModule {}
