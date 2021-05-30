import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RelatedExpenseModel } from 'app/models/relatedExpense';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-related-expense-edit',
  templateUrl: './related-expense-edit.component.html',
  styleUrls: ['./related-expense-edit.component.css']
})
export class RelatedExpenseEditComponent implements OnInit {

  constructor(private http: HttpClient, private route:ActivatedRoute) { }

  id: number;
  relatedExpense: RelatedExpenseModel;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['Id'];
    const headers = { 'Authorization': 'Bearer my-token', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token' }
    this.http.get<any>('https://localhost:44346/api/property/relatedexpenses/' + this.id, { headers }).subscribe(data => {
        this.relatedExpense = data.data;
        var formattedDate = this.relatedExpense.expenseDate.substring(
          0,
          this.relatedExpense.expenseDate.indexOf("T")
        );
        this.relatedExpense.expenseDate = formattedDate; 
        console.log(this.relatedExpense);
    });
  }

  onFormSubmit(form:NgForm): void {
    const headers = { 'Authorization': 'Bearer my-token', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token' }
    this.http.put<any>('https://localhost:44346/api/property/relatedexpenses', this.relatedExpense, { headers }).subscribe(data => {
        location.href="/#/property/" + this.relatedExpense.propertyId;
    });
  }

}
