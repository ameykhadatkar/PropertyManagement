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
  loading: boolean;
  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.loading = true;
    this.http
      .get<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/expense")
      .subscribe((data) => {
        this.loading = false;

        this.transactions = data.records;
        this.transactions.forEach(function (item, index) {
          var formattedDate = item.paymentDateTime.substring(
            0,
            item.paymentDateTime.indexOf("T")
          );
          item.paymentDateTime = formattedDate;
        });
        console.log(this.transactions);
      });
  }
  deleteTransaction(expenseID: number): void {
    this.loading = true;

    this.http.delete<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/Expense/" + expenseID).subscribe((data) => {
      if (data.responseCode = 'OK') {
        this.loading = false;

        alert("Transaction has been removed")
        this.transactions.forEach((value, index) => {
          if (value.id === expenseID) this.transactions.splice(index, 1);
        });

      }
    });
  }

}
