import { Component, OnInit, Inject } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry, map, startWith } from "rxjs/operators";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { Property } from "app/models/propertymodel";
import { TransactionModel } from "app/models/TransactionModel";
import swal from 'sweetalert';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Optional } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { NULL_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-create-transaction",
  templateUrl: "./create-paymentType.component.html",
  styleUrls: ["./create-paymentType.component.css"],
})
export class CreatePaymentTypeComponent implements OnInit {

  paymentTypes: any[];
  paymentName : "";
  PaymentTypeId: "";
  
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, @Optional() public dialogRef: MatDialogRef<CreatePaymentTypeComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.paymentTypes=[{
      name:"Income"
    },{
      name : "Expense"
    }   ];
  }   
  onFormSubmit(){
    debugger
    var request = {
      // createdDateTime:'2021-08-07T18:22:01.200Z',
      Name:this.paymentName,
      Type:this.PaymentTypeId
    }
    this.http
        .post<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/Expense/paymenttypes", request)
        .subscribe((data) => {
          swal("PaymentType Has Been Added Successfully!")
          this.dialogRef.close()
        });

  }
}
