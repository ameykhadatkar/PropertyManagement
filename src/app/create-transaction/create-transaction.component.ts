import { Component, OnInit } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry, map, startWith } from "rxjs/operators";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { Property } from "app/models/propertymodel";
import { TransactionModel } from "app/models/TransactionModel";
import swal from 'sweetalert';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";

@Component({
  selector: "app-create-transaction",
  templateUrl: "./create-transaction.component.html",
  styleUrls: ["./create-transaction.component.css"],
})
export class CreateTransactionComponent implements OnInit {
  productForm: FormGroup;
  propertyControl = new FormControl();
  properties: Property[];
  propertyFilteredOptions: Observable<Property[]>;
  paymentTypes: any[];
  transactionModeTypes : any[];
  paymentTypeId: number;
  reimbursible = false;
  transaction: TransactionModel = new TransactionModel();

  PropertyId: number;
  PropertyValue: number;
  TenantId: number;
  PaymentTypeId: number;
  AllPropertyExpense: boolean;
  Reimbursible: boolean;
  Personal: boolean;
  PaymentDatetime: string;
  Amount: number;
  TransactionMode:""
  propertyForm: FormGroup;
  error: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      PropertyId: [null, Validators.required],
      PaymentTypeId: [null, Validators.required],
      AllPropertyExpense: [null],
      Reimbursible: [null],
      Personal: [null],
      PaymentDatetime: [null, Validators.required],
      Amount: [null, Validators.required],
    });

    this.transactionModeTypes = [{
        id:1,
        transactionMode:"Checking Account"
     },{
        id:2,
        transactionMode:"Credit Card"
    }]

    this.http
      .get<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/property")
      .subscribe((data) => {
        this.properties = data.records;
        console.log(this.properties);
        this.propertyFilteredOptions = this.propertyControl.valueChanges.pipe(
          startWith(""),
          map((value) => (typeof value === "string" ? value : value.name)),
          map((name) => (name ? this._filter(name) : this.properties.slice()))
        );
      });
    this.http
      .get<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/expense/paymenttypes")
      .subscribe((data) => {
        this.paymentTypes = data.records;
      });
  }
  getPropertyName(id){

    var j = id;

  }
  checkExpenseType(id:number){
    if(id === 1){
      this.AllPropertyExpense = false;
    }
    if(id === 2){
      this.Personal = false;
      this.setPropertyId("");
      this.propertyFilteredOptions = this.propertyControl.valueChanges.pipe(
        startWith(""),
        map((value) => (typeof value === "string" ? value : value.name)),
        map((name) => (name ? this._filter(name) : this.properties.slice()))
      );
    }
  }
  // displayFn(prop: any): string {
  //   return "test";
  //   return prop && prop.name ? prop.name : "";
  // }

  private _filter(name: string): Property[] {
    const filterValue = name.toLowerCase();
    return this.properties.filter((option) => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onFormSubmit(): void {  
    if(this.AllPropertyExpense === false && (this.PropertyValue===undefined || this.PropertyValue === 0)){
    swal("Property missing","Please select a property to save transaction", "error");
    return;
    }
    else if((this.AllPropertyExpense === false ||this.AllPropertyExpense ===undefined)  && (this.Reimbursible === false || this.Reimbursible=== undefined) && (this.Personal === false || this.Personal === undefined)){
      swal("Expense Type missing","Please select if it is a Personal,Reimburse or All property expense", "error");
      return;
      }
    else if(this.paymentTypes === undefined || this.Amount === undefined || this.PaymentDatetime === undefined){
    swal("Incomplete Details","Please select all required fields to save transaction", "error");
    return ;
    }
    this.transaction.PropertyId = this.PropertyValue;
    this.transaction.tenantId = this.PropertyValue;
    this.transaction.PaymentTypeId = this.PaymentTypeId;
    this.transaction.allPropertyExpense = this.AllPropertyExpense;
    this.transaction.reimbursible = this.Reimbursible;
    this.transaction.Personal = this.Personal;
    this.transaction.PaymentDatetime = this.PaymentDatetime;
    this.transaction.Amount = this.Amount;
    this.transaction.Type = "Expense";
    this.transaction.transactionMode = this.TransactionMode;
    console.log(this.transaction);

    this.http
      .post<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/expense", this.transaction)
      .subscribe((data) => {
        swal("Transaction Has Been Added Successfully!")
        location.href = "/#/transactions";
      });
  }

  setPropertyId(item) {
    this.PropertyValue = item.id;
    this.PropertyId = item.id;
    this.AllPropertyExpense = false;
  }
   handleError = (control: string, error: string) => {
    return this.propertyForm.controls[control].hasError(error);
  }
}
