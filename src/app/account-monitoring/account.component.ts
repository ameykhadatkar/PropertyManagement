import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { GlobalConstants } from 'app/global-constants';
import swal from 'sweetalert';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  transactions: Array<any>;
  accountTransactions: Array<any>;
  account:any = [];
  account_update:any = [];
  showAccount= 0
  showCredit = 0
  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  ngOnInit(): void {

    const headers = {
      Authorization: "Bearer my-token",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    };
    this.http
      .get<any>(GlobalConstants.apiURL + "api/Finance", { headers })
      .subscribe((data) => {
        this.account = data.data;
      });
      this.http
      .get<any>(GlobalConstants.apiURL + "api/Finance/expenses", { headers })
      .subscribe((data) => {
        this.transactions = data.records;
        this.transactions.forEach(function (item, index) {
          var dateobj = new Date(item.paymentDateTime);
          item.paymentDateTime = dateobj.toLocaleDateString("en-US");
        });
      });
  this.accountTransactions = [{
    id:23,
    property : {
      name : 'Jon Doe'
    },
    personal : 'yes',
    reimbursible : 'testing',
    paymentDateTime : '01/06/2021',
    amount : 75000,
  },{
    id:1,
    property : {
      name : 'Lok ak'
    },
    personal : 'yes',
    reimbursible : 'anca',
    paymentDateTime : '03/05/2021',
    amount : 23000,
  }
]
  }
  ShowTransactionDetails(TransactionType) {
    this.showAccount = 0;
    this.showCredit = 0;
    if(TransactionType == 'credit')
    {
      this.showCredit  = 1;  
    } 
    else
    {
      this.showAccount = 1;
    }
 }
 UpdateBalance() {
  const headers = {
    Authorization: "Bearer my-token",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  };
  this.account_update = {
    id:this.account.id,
    checkingAccountBalance : Number(this.account.checkingAccountBalance),
    creditCardLimit : Number(this.account.creditCardLimit),
    checkingAccountIncome : Number(this.account.checkingAccountIncome),
    checkingAccountExpense : Number(this.account.checkingAccountExpense),
    creditCardExpense : Number(this.account.creditCardExpense)
  }
  this.http
    .put<any>(GlobalConstants.apiURL + "api/Finance",this.account_update, { headers })
    .subscribe((data) => {
      swal("Account has been updated")
    });
 }
}
