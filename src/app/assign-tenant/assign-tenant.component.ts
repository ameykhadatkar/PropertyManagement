import { Component, Input, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { TenantModel } from "app/models/TenantModel";
import { PropertyMappingModel } from "app/models/PropertyMappingModel";
import swal from 'sweetalert';
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
  lateFees: string;
  propertyId: number;
  tenantId: number;
  startDate: string;
  endDate: string;
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
      lateFees: [null, Validators.required],
    });
    this.tenantExist = 0;
    
    if(this.tenant != null) {
      this.tenantExist = 1;
      this.firstName = this.tenant.tenant.firstName;
      this.lastName = this.tenant.tenant.lastName;
      this.rent = this.tenant.rent;
      this.securityDeposit = this.tenant.securityDeposit;
      this.lateFees = this.tenant.lateFees;
      debugger
     // this.startDate = this.datePipe.transform(this.tenant.startDate, 'mm-dd-yyy');
     this.startDate = this.tenant.startDate
     this.endDate = this.datePipe.transform(this.tenant.endDate, 'mm-dd-yyyy');
      this.productForm.controls.startDate.setValue(this.startDate);
      this.email = this.tenant.tenant.email;
      this.phone = this.tenant.tenant.phone;
      this.tenantId = this.tenant.tenantId

    }
    this.tenantdata = new TenantModel();
    this.propertyMapping = new PropertyMappingModel();
  }

  onFormSubmit(form: NgForm): void {
    this.tenantdata.firstName = this.firstName;
    this.tenantdata.lastName = this.lastName;
    this.tenantdata.email = this.email;
    this.tenantdata.phone = this.phone;

    
    this.propertyMapping.rent = this.rent;
    this.propertyMapping.securityDeposit = this.securityDeposit;
    this.propertyMapping.lateFees = this.lateFees;
    this.propertyMapping.startDate = this.startDate;
    this.propertyMapping.endDate = this.endDate;
    var propertyIdNumber: number = +this.propertyId;
    this.propertyMapping.propertyId = propertyIdNumber;
    this.loading = true;
    this.http
      .post<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/tenant", this.tenantdata)
      .subscribe((data) => {
        this.loading = false;
        this.tenantId = data.data.id;
        this.propertyMapping.tenantId = this.tenantId;
        this.http
          .post<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/tenant/" + this.tenantId + "/property", this.propertyMapping)
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
    this.http
    .put<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/Tenant", this.tenantdata)
    .subscribe((data) => {
      this.loading = false;
      swal("Success", "Tenant information has been updated", "info");
    });
  }
  removeTenant() {
    this.http
    .delete<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/Tenant/"+this.tenantId )
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
        lateFees: [null, Validators.required],
      });
      swal("Success", "Tenant has been deleted successfully", "info");
    });
  }
}
