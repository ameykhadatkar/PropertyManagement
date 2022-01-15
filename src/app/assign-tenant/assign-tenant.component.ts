import { Component, Input, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { TenantModel } from "app/models/TenantModel";
import { PropertyMappingModel } from "app/models/PropertyMappingModel";
import { GlobalConstants } from 'app/global-constants';
import swal from 'sweetalert';
//import { CurrencyMaskModule } from "ng2-currency-mask";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-assign-tenant",
  templateUrl: "./assign-tenant.component.html",
  styleUrls: ["./assign-tenant.component.css"],
})
export class AssignTenantComponent implements OnInit {
  productForm: FormGroup;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rent: string;
  securityDeposit: string;
  petDeposit: number;
  lateFees: string;
  propertyId: number;
  tenantId: number;
  startDate: string;
  endDate: string;
  notes: string;
  tenantdata: TenantModel;
  propertyMapping: PropertyMappingModel;
  loading: boolean;
  tenantExist = 0
  @Input() tenant: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.params["Id"];
    this.productForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      rent: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      securityDeposit: [null, Validators.required],
      petDeposit: [null, Validators.required],
      lateFees: [null, Validators.required],
      notes: [null, null],
    });
    this.tenantExist = 0;
    
    if(this.tenant != null) {
      console.log(this.tenant);
      this.tenantExist = 1;
      this.firstName = this.tenant.tenant.firstName;
      this.lastName = this.tenant.tenant.lastName;
      this.rent = this.tenant.rent;
      this.securityDeposit = this.tenant.securityDeposit;
      this.petDeposit = this.tenant.petDeposit;
      this.lateFees = this.tenant.lateFees;
      this.email = this.tenant.tenant.email;
      this.phone = this.tenant.tenant.phone;
      this.tenantId = this.tenant.tenantId;
      this.notes = this.tenant.tenant.notes;
      //this.datePipe.transform(yesterday, 'yyyy-MM-dd');//
     this.startDate = this.datePipe.transform(new Date(this.tenant.startDate), 'yyyy-MM-dd');
     this.endDate = this.datePipe.transform(new Date(this.tenant.endDate), 'yyyy-MM-dd');
      this.productForm.controls.startDate.setValue(this.startDate);

    }
    this.tenantdata = new TenantModel();
    this.propertyMapping = new PropertyMappingModel();
  }

  onFormSubmit(form: NgForm): void {
    debugger;
    this.tenantdata.firstName = this.firstName;
    this.tenantdata.lastName = this.lastName;
    this.tenantdata.email = this.email;
    this.tenantdata.phone = this.phone;
    this.tenantdata.notes = this.notes;
    

    
    this.propertyMapping.rent = this.rent;
    this.propertyMapping.securityDeposit = this.securityDeposit;
    this.propertyMapping.petDeposit = this.petDeposit;
    this.propertyMapping.lateFees = this.lateFees;
    this.propertyMapping.startDate = this.startDate;
    this.propertyMapping.endDate = this.endDate;
    var propertyIdNumber: number = +this.propertyId;
    this.propertyMapping.propertyId = propertyIdNumber;
    this.loading = true;
    this.http
      .post<any>(GlobalConstants.apiURL + "api/tenant", this.tenantdata)
      .subscribe((data) => {
        this.loading = false;
        this.tenantId = data.data.id;
        this.propertyMapping.tenantId = this.tenantId;
        this.http
          .post<any>(GlobalConstants.apiURL + "api/tenant/" + this.tenantId + "/property", this.propertyMapping)
          .subscribe((data) => {
            swal("Success", "Tenant has been added successfully", "info");
            this.tenantExist = 1;
            location.href="/#/property/" + this.propertyId;
          });
      });
  }
  updateTenant() {
    this.tenantdata.firstName = this.firstName;
    this.tenantdata.lastName = this.lastName;
    this.tenantdata.email = this.email;
    this.tenantdata.phone = this.phone;
    this.tenantdata.notes = this.notes;
    if(this.tenant != null) {
      this.tenantdata.id = this.tenantId;
    }
    this.http
    .put<any>(GlobalConstants.apiURL + "api/Tenant", this.tenantdata)
    .subscribe((data) => {
      this.loading = false;
      var postData = {
        TenantId: this.tenantId,
        Rent: this.rent,
        PropertyId: Number(this.propertyId),
        LateFees: this.lateFees,
        SecurityDeposit: this.securityDeposit,
        petDeposit: this.petDeposit,
        EndDate: this.endDate,
        Notes: this.notes
      };
      this.http
        .post<any>(GlobalConstants.apiURL + "api/tenant/updatetenancy", postData)
        .subscribe((data) => {
          swal("Success", "Tenant has been updated successfully", "info");
          this.tenantExist = 1;
          location.href="/#/property/" + this.propertyId;
        });
    });
  }
  removeTenant() {
    this.http
    .delete<any>(GlobalConstants.apiURL + "api/Tenant/"+this.tenantId )
    .subscribe((data) => {
      this.loading = false;
      this.tenantExist = 0;
      this.productForm = this.formBuilder.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        email: [null, Validators.required],
        phone: [null, Validators.required],
        rent: [null, Validators.required],
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
        securityDeposit: [null, Validators.required],
        petDeposit: [null, Validators.required],
        lateFees: [null, Validators.required],
        notes: [null, null]
      });
      swal("Success", "Tenant has been deleted successfully", "info");
    });
  }
}
