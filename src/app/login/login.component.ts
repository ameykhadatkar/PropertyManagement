import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'app/global-constants';
import swal from 'sweetalert';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: any;
  loading: boolean;
  userEmail:"";
  userPassword:"";
  loginDetails :any = [];
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
    this.loading = true;
    try {
      this.http
      .post<any>(GlobalConstants.apiURL + "api/Auth/login", this.loginForm.value)
      .subscribe((response) => {
        
        this.loading = false;
        if(response.message == "Success") {
          sessionStorage.setItem("loginID", this.userEmail);
          sessionStorage.setItem("loginPwd", this.userPassword);
          sessionStorage.setItem("isLogin", "true");
          this.router.navigate(['/dashboard'], { relativeTo: this.route });
        }
      },
      (error:HttpErrorResponse) => {
        this.loading = false;
        swal("Invalid Authentication","Please enter valid email and password to login", "error");
      });
    } catch (error) {
      this.loading = false;
      swal("Something went wrong", "Please try again", "info");
    }
   

  }
  handleError = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  }
}
