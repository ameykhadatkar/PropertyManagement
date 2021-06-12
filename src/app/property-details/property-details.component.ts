import { Component, OnInit, Inject, ɵCompiler_compileModuleSync__POST_R3__ } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Property } from "app/models/propertymodel";
//import { RelatedExpenseModel } from "app/models/relatedExpense";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NumberFormatValidator } from "ajv";

export interface RelatedExpenseModel {
  id: number;
  title: string;
  propertyId: string;
  inMonths: number;
  expenseDate: string;
  description: string;
  amount: number;
  createdDateTime: string;
  lastModifiedDateTime: string;
}

@Component({
  selector: "app-property-details",
  templateUrl: "./property-details.component.html",
  styleUrls: ["./property-details.component.css"],
})
export class PropertyDetailsComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute, public dialog: MatDialog) {}
  id: number;
  propertyData: any;
  relatedExpenses: Array<RelatedExpenseModel>;
  selectedExpense: RelatedExpenseModel;

  ngOnInit(): void {
    this.id = this.route.snapshot.params["Id"];
    const headers = {
      Authorization: "Bearer my-token",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    };
    this.http.get<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/property/" + this.id, { headers }).subscribe((data) => {
      this.propertyData = data.data;
      console.log(this.propertyData);
    });

    this.http.get<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/property/" + this.id + "/relatedexpenses", { headers }).subscribe((data) => {
      this.relatedExpenses = data.records;
      this.relatedExpenses.forEach(function (relatedExpense, index) {
        var formattedDate = relatedExpense.expenseDate.substring(0, relatedExpense.expenseDate.indexOf("T"));
        relatedExpense.expenseDate = formattedDate;
      });
    });
  }

  openDialog(id): void {
    this.selectedExpense = this.relatedExpenses.find((x) => x.id == id);

    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: "400px",
      data: {
        title: this.selectedExpense.title,
        amount: this.selectedExpense.amount,
        expenseDate: this.selectedExpense.expenseDate,
        description: this.selectedExpense.description,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.selectedExpense = result;
      console.log(result);
    });
  }
  deleteRelatedExpense(expenseID:number): void {
    const headers = {
      Authorization: "Bearer my-token",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    };
    this.http.delete<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/property/relatedexpense/" + expenseID , { headers }).subscribe((data) => {
      if(data.responseCode = 'OK'){
        alert("Related expense has been removed")
        this.relatedExpenses.forEach((value,index)=>{
          if(value.id===expenseID) this.relatedExpenses.splice(index,1);
      });
        
      }
    });
  }
  sellProperty(id): void {
    var sellAmount = prompt("Please enter the selling amount", "0");
    if (sellAmount != null) {
      var data = {
        SellingAmount: parseFloat(sellAmount),
        PropertyId: id
      }

      const headers = {
        Authorization: "Bearer my-token",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      };
      this.http.post<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/property/" + this.id + "/sell", data, { headers }).subscribe((data) => {
        if(data.responseCode = 'OK'){
          location.href="/#/properties"
        }
      });
    }
  }
}

@Component({
  selector: "dialog-elements-example-dialog",
  templateUrl: "update-expense-dialog.html",
})
export class DialogElementsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: RelatedExpenseModel) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
