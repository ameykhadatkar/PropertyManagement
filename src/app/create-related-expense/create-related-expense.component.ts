import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { GlobalConstants } from 'app/global-constants';
import { RelatedExpenseModel } from "app/models/relatedExpense";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-create-related-expense",
  templateUrl: "./create-related-expense.component.html",
  styleUrls: ["./create-related-expense.component.css"],
})
export class CreateRelatedExpenseComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  productForm: FormGroup;
  title: string = "";
  expenseDate: string = "";
  description: string = "";
  amount: number = 0;
  isLoadingResults = false;

  propertyId: number;
  relatedExpense: RelatedExpenseModel = new RelatedExpenseModel();
  ngOnInit(): void {
    this.propertyId = this.route.snapshot.params["propertyId"];
    this.productForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'expenseDate' : [null, Validators.required],
      'amount' : [null, Validators.required],
      'description' : [null]
    });
  }

  onFormSubmit(form: NgForm): void {
    this.relatedExpense.title = this.title;
    this.relatedExpense.expenseDate = this.expenseDate;
    this.relatedExpense.amount = this.amount;
    this.relatedExpense.description = this.description;

    this.http
      .post<any>(
        GlobalConstants.apiURL + "api/property/" +
          this.propertyId +
          "/relatedexpenses",
        this.relatedExpense
      )
      .subscribe((data) => {
        location.href = "/#/property/" + this.propertyId;
      });
  }
}
