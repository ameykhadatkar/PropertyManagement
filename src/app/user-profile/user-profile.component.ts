import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
userDetails : any = []
userLogin : any = []
userEmail =""
userPwd = ""
  constructor( private http: HttpClient) { }

  ngOnInit() {
    this.userLogin = {
      email:"",
      password:""
    }
    if(sessionStorage.getItem("loginID") != null){
      this.userLogin.email = sessionStorage.getItem("loginID");
      this.userLogin.password  = sessionStorage.getItem("loginPwd");
      try {
        this.http
        .post<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/Auth/login", this.userLogin)
        .subscribe((response) => {
          if(response.message == "Success") {
            this.userDetails = response.data.userDetails
          }
        },
        (error:HttpErrorResponse) => {
  
        });
      } catch (error) {

      }
    }
    // this.userDetails = {
    //   id:1,
    //   FirstName : 'Amey',
    //   LastName : 'k',
    //   Password: 'xyz',
    //   UserName: 'ameyk',
    //   Email :'test@test.com' ,
    //   SecurityQuestion :'What is your name?' ,
    //   Answer :'Amey' 
    // }
  }
  UpdateProfile(){
    alert('Profile has been updated successfully')
  }

}
