import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {  FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'app/global-constants';
import swal from 'sweetalert';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  showCode = 1;
  userEmail :any = []
  forgotPassword: FormGroup;
  constructor(private http: HttpClient,private router: Router,private route: ActivatedRoute,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.forgotPassword = this.formBuilder.group({
      email: [''],
      password: [''],
      token: ['']
    });
    this.userEmail = {
      email:""
    }
  }
  GenerateCode(){
    this.http
    .post<any>(GlobalConstants.apiURL + "api/Auth/forgotpassword",this.userEmail)
    .subscribe((data) => {
      this.showCode = 0;
      swal("A code has been sent on you email address, Please enter to reset your password")
    });
  }
  resetPassword(){
    this.http
    .post<any>(" https://propertymanagemet20210611034324.azurewebsites.net/api/Auth/resetpassword",this.forgotPassword.value)
    .subscribe((data) => {
      swal("Your Password has been updated!")
      this.router.navigate(['/login'], { relativeTo: this.route });
    });
  }

}
