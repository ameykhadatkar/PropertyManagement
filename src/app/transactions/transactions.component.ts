import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Array<any>;

  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  ngOnInit(): void {
    const headers = {
      Authorization: "Bearer my-token",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    };
    this.http
      .get<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/expense", { headers })
      .subscribe((data) => {
        this.transactions = data.records;
        this.transactions.forEach(function(item, index){
          var formattedDate = item.paymentDateTime.substring(
            0,
            item.paymentDateTime.indexOf("T")
          );
          item.paymentDateTime = formattedDate;
        });
        console.log(this.transactions);
      });
  }
  deleteTransaction(expenseID:number): void {
    const headers = {
      Authorization: "Bearer my-token",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    };
    this.http.delete<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/Expense/" + expenseID , { headers }).subscribe((data) => {
      if(data.responseCode = 'OK'){
        alert("Transaction has been removed")
        this.transactions.forEach((value,index)=>{
          if(value.id===expenseID) this.transactions.splice(index,1);
      });
        
      }
    });
  }

}
