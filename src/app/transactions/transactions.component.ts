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
  startdate: Date;
  enddate: Date;
  pageNumber: number;
  maxPage: number;
  createTransactionComponent:CreateTransactionComponent
  constructor(private http: HttpClient, public datepipe: DatePipe,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loading = true;
    this.pageNumber = 1;
    this.loadPage(this.pageNumber);
  }

  next(): void {
    this.loading = true;
    this.pageNumber = this.pageNumber + 1;
    this.loadPage(this.pageNumber);
  }

  previous(): void {
    this.loading = true;
    this.pageNumber = this.pageNumber - 1;
    this.loadPage(this.pageNumber);
  }

  search(): void {
    this.loading = true;
    this.pageNumber = 1;
    this.loadPage(this.pageNumber);
  }

  loadPage(pageNumber){
    console.log(this.startdate);
    console.log(this.enddate);
    var url = "https://propertymanagemet20210611034324.azurewebsites.net/api/expense/list/" + this.pageNumber + "?";
    if(this.startdate != undefined && this.startdate != null){
      url = url + "startdate=" + this.startdate
    }
    if(this.enddate != undefined && this.enddate != null){
        url = url + "&enddate=" + this.enddate;
    }
    this.http
      .get<any>(url)
      .subscribe((data) => {
        this.loading = false;
        this.maxPage = Math.floor(data.totalRecords / 10) + 1;
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
