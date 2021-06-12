import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: any;
  constructor( private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {   
    const headers = {
      Authorization: "Bearer my-token",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    };
    try {
      this.http
      .post<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/Auth/login", this.loginForm.value, { headers })
      .subscribe((response) => {
        
        
        if(response.message == "Success") {
          sessionStorage.setItem("isLogin", "true");
          this.router.navigate(['/dashboard'], { relativeTo: this.route });
        }
      },
      (error:HttpErrorResponse) => {
        swal("Invalid Authentication","Please enter valid email and password to login", "error");
      });
    } catch (error) {
      swal("Hello world!");
    }
   

  }
  handleError = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  }
}
