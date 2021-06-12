import { Component, OnInit } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry, map, startWith } from "rxjs/operators";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { Property } from "app/models/propertymodel";
import { TransactionModel } from "app/models/TransactionModel";
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
  paymentTypeId: number;
  reimbursible = false;
  transaction: TransactionModel = new TransactionModel();

  PropertyId: number;
  TenantId: number;
  PaymentTypeId: number;
  AllPropertyExpense: boolean;
  Reimbursible: boolean;
  Personal: boolean;
  PaymentDatetime: string;
  Amount: number;

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

    const headers = {
      Authorization: "Bearer my-token",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    };
    this.http
      .get<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/property", { headers })
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
      .get<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/expense/paymenttypes", { headers })
      .subscribe((data) => {
        this.paymentTypes = data.records;
      });
  }
  getPropertyName(id){

    var j = id;

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
    this.transaction.PropertyId = this.PropertyId;
    this.transaction.PaymentTypeId = this.PaymentTypeId;
    this.transaction.AllPropertyExpense = this.AllPropertyExpense;
    this.transaction.Reimbursible = this.Reimbursible;
    this.transaction.Personal = this.Personal;
    this.transaction.PaymentDatetime = this.PaymentDatetime;
    this.transaction.Amount = this.Amount;
    this.transaction.Type = "Expense";
    console.log(this.transaction);

    const headers = {
      Authorization: "Bearer my-token",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    };
    this.http
      .post<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/expense", this.transaction, { headers })
      .subscribe((data) => {
        location.href = "/#/transactions";
      });
  }

  setPropertyId(item) {
    this.PropertyId = item.id;
  }
}
