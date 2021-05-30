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
      .get<any>("https://localhost:44346/api/expense", { headers })
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

}
