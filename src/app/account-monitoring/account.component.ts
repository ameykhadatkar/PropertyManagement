import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  transactions: Array<any>;
  accountTransactions: Array<any>;
  account:any = [];
  showAccount= 0
  showCredit = 0
  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  ngOnInit(): void {

    this.account = {
      accountBalance : 80000,
      creditCardexpense:4000,
      acountExpense:25000,
      accountIncome:50000

    };
    this.transactions = [{
      id:1,
      property : {
        name : 'Walter'
      },
      personal : 'yes',
      reimbursible : 'test',
      paymentDateTime : '27/05/2021',
      amount : 10000,
    },{
      id:1,
      property : {
        name : 'XYZ'
      },
      personal : 'yes',
      reimbursible : 'test',
      paymentDateTime : '15/05/2021',
      amount : 30000,
    }
  ]
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

 }
}
