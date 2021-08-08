import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DatePipe } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { TenantRequestComponent } from './tenantrequest/tenantrequest.component';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ExportReportsComponent } from './export-reports/export-reports/export-reports.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { BasicAuthInterceptor } from 'interceptors/basic-auth.interceptor';
import { DocumentStorageComponent } from './document-storage/document-storage.component';
import { MatFileUploadModule } from 'mat-file-upload';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTooltipModule,
    MatDialogModule,
    MatAutocompleteModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.cubeGrid,
      backdropBorderRadius: '4px',
      primaryColour: '#f44336',
    }),
    MatFileUploadModule
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SignupComponent,
    LoginComponent,
    ExportReportsComponent,
    TenantRequestComponent,
    DocumentStorageComponent,
    ForgotpasswordComponent

  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
