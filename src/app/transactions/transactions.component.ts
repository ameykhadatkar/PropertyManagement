import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateTransactionComponent } from '../create-transaction/create-transaction.component';
import { CreatePaymentTypeComponent } from '../create-paymentType/create-paymentType.component';
import swal from 'sweetalert';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Array<any>;
  loading: boolean;
  createTransactionComponent:CreateTransactionComponent
  constructor(private http: HttpClient, public datepipe: DatePipe,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loading = true;
    this.http
      .get<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/expense/list/1")
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
  addPaymentType(){
    const dialogref = this.dialog.open(CreatePaymentTypeComponent, {
      width: '50%',
      height: 'auto',
      maxHeight: '70%',
      // disableClose: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }
  editTransaction(transactions:any): void {
    const dialogref = this.dialog.open(CreateTransactionComponent, {
      width: '80%',
      height: 'auto',
      maxHeight: '70%',
      // disableClose: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      data: {transactions}
    });
  }
  deleteTransaction(expenseID: number): void {
    this.loading = true;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this transaction",
      icon: "warning",
      buttons: [
        'Cancel',
        'OK'
      ],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.http.delete<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/Expense/" + expenseID).subscribe((data) => {
          if (data.responseCode = 'OK') {
            this.loading = false;   
            swal("Transaction has been removed")
            this.transactions.forEach((value, index) => {
              if (value.id === expenseID) this.transactions.splice(index, 1);
            });
    
          }
        });
      } else {
        this.loading = false
      }
    });

  }

}
