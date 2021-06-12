import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { ThemePalette } from "@angular/material/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry, map, startWith } from "rxjs/operators";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { Property } from "app/models/propertymodel";
import { TransactionModel } from "app/models/TransactionModel";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      securityQuestion: ['', Validators.required],
      answer: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("([a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+[.])([a-zA-Z])+(.[a-zA-Z]*)")]]
    });
  }

  handleError = (control: string, error: string) => {
    return this.signupForm.controls[control].hasError(error);
  }

  signup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return false;
    }

    console.log(this.signupForm.value);
    // return false;
    const headers = {
      Authorization: "Bearer my-token",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    };
    this.http
      .post<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/Auth/register", this.signupForm.value, { headers })
      .subscribe((data) => {
        console.log(data);
      });

  }
}
