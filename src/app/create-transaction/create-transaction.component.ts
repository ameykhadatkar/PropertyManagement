import { Component, OnInit, Inject } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry, map, startWith } from "rxjs/operators";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { Property } from "app/models/propertymodel";
import { TransactionModel } from "app/models/TransactionModel";
import { GlobalConstants } from 'app/global-constants';
import swal from 'sweetalert';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Optional } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { NULL_EXPR } from "@angular/compiler/src/output/output_ast";

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
  transactionModeTypes: any[];
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
  TransactionMode: ""
  propertyForm: FormGroup;
  error: any;
  fileData: File;
  loading: boolean;
  fileBase64String: string;
  fileName: string;
  entity: string;
  checkNo: string;
  details: string;
  existingtransactionID = 0;
  PropertyName: string;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, @Optional() public dialogRef: MatDialogRef<CreateTransactionComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      PropertyId: [null, Validators.required],
      PaymentTypeId: [null, Validators.required],
      AllPropertyExpense: [null],
      Reimbursible: [null],
      Personal: [null],
      PaymentDatetime: [null, Validators.required],
      Amount: [null, Validators.required],
      Entity: [null, Validators.required],
    });

    this.http
      .get<any>(GlobalConstants.apiURL + "api/property")
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
      .get<any>(GlobalConstants.apiURL + "api/expense/paymenttypes")
      .subscribe((data) => {
        this.paymentTypes = data.records;
      });
    this.transactionModeTypes = [{
      id: 1,
      transactionMode: "Checking Account"
    }, {
      id: 2,
      transactionMode: "Credit Card"
    }];



    if (this.data != null) {
      this.existingtransactionID = this.data.transactions.id
      this.PropertyId = this.data.transactions.property.name;
      this.setPropertyId(this.data.transactions.property);
      this.PropertyName = this.data.transactions.property.name;
      this.PaymentTypeId = this.data.transactions.paymentTypeId;
      this.AllPropertyExpense = this.data.transactions.allPropertyExpense;
      this.Reimbursible = this.data.transactions.reimbursible;
      this.Personal = this.data.transactions.personal;
      this.PaymentDatetime = this.data.transactions.paymentDateTime;
      this.Amount = this.data.transactions.amount;
      //this.transaction.Type = "Expense";
      this.TransactionMode = this.data.transactions.transactionMode;
      this.entity = this.data.transactions.entity;
      this.checkNo = this.data.transactions.checkNo;
      this.details = this.data.transactions.details;
      this.fileName = this.data.transactions.fileName;
      this.fileBase64String = this.data.transactions.base64String;
      this.productForm.controls.PropertyId.setValue(this.PropertyId);
      this.productForm.controls.PaymentTypeId.setValue(this.PaymentTypeId);
      this.productForm.controls.AllPropertyExpense.setValue(this.AllPropertyExpense);
      this.productForm.controls.Reimbursible.setValue(this.Reimbursible);
      this.productForm.controls.Personal.setValue(this.Personal);
      this.productForm.controls.PaymentDatetime.setValue(this.PaymentDatetime);
      this.productForm.controls.Amount.setValue(this.Amount);
      this.productForm.controls.Entity.setValue(this.entity);
    }
  }

  sortBy(prop: string) {
    return this.paymentTypes.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  getPropertyName(id) {

    var j = id;

  }
  checkExpenseType(id: number) {
    if (id === 1) {
      this.AllPropertyExpense = false;
    }
    if (id === 2) {
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
    if (this.AllPropertyExpense === false && (this.PropertyValue === undefined || this.PropertyValue === 0)) {
      swal("Property missing", "Please select a property to save transaction", "error");
      return;
    }
    else if (this.paymentTypes === undefined || this.Amount === undefined || this.PaymentDatetime === undefined) {
      swal("Incomplete Details", "Please select all required fields to save transaction", "error");
      return;
    }
    this.transaction.PropertyId = this.PropertyValue;
    this.transaction.tenantId = null;
    this.transaction.PaymentTypeId = this.PaymentTypeId;
    this.transaction.allPropertyExpense = this.AllPropertyExpense;
    this.transaction.reimbursible = this.Reimbursible;
    this.transaction.Personal = this.Personal;
    this.transaction.PaymentDatetime = this.PaymentDatetime;
    this.transaction.Amount = this.Amount;
    this.transaction.Type = "Expense";
    this.transaction.transactionMode = this.TransactionMode;
    this.transaction.entity = this.entity;
    this.transaction.checkNo = this.checkNo;
    this.transaction.details = this.details;
    this.transaction.fileName = this.fileName;
    this.transaction.base64String = this.fileBase64String;
    if (this.existingtransactionID == 0) {
      this.http
        .post<any>(GlobalConstants.apiURL + "api/expense", this.transaction)
        .subscribe((data) => {
          swal("Transaction Has Been Added Successfully!")
          location.href = "/#/transactions";
        });
    }
    else {
      this.transaction.id = this.existingtransactionID;
      this.http
        .put<any>(GlobalConstants.apiURL + "api/expense", this.transaction)
        .subscribe((data) => {
          swal("Transaction Has Been updated Successfully!")
          this.dialogRef.close()
        });
    }

  }

  setPropertyId(item) {
    this.PropertyValue = item.id;
    // this.PropertyId = item.id;
    this.AllPropertyExpense = false;
  }
  handleError = (control: string, error: string) => {
    return this.propertyForm.controls[control].hasError(error);
  }
  CancelTransaction() {
    if(this.dialogRef == undefined){
      location.href = "/#/transactions";}
    else{   this.dialogRef.close(0);}
 

  }
  onUploadClicked(event) {
    this.fileData = <File>event[0];
    if (this.fileData != undefined) {
      this.loading = true;
      var reader = new FileReader();
      // this.imagePath = files;
      reader.readAsBinaryString(this.fileData);
      console.log(reader.result);

      console.log(reader.result);
      reader.onload = (_event) => {
        console.log(_event.target.result);
        this.fileBase64String = btoa(_event.target.result.toString());
        this.fileName = this.fileData.name;
      }

    }

  }
}
