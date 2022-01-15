import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from 'app/global-constants';
import swal from 'sweetalert';

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
fileData: File;
loading: boolean;
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
        .post<any>(GlobalConstants.apiURL + "api/Auth/login", this.userLogin)
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
    try {  
      this.http
      .post<any>(GlobalConstants.apiURL + "api/Auth/user/update", this.userDetails)
      .subscribe((response) => {
         swal("Profile has been updated succesfully")
      },
      (error:HttpErrorResponse) => {

      });
    } catch (error) {
  
  }
}

  onUploadClicked(event) {
    
    this.fileData = <File>event[0];
    if(this.fileData != undefined) {
      this.loading = true;
      var reader = new FileReader();
      // this.imagePath = files;
      reader.readAsBinaryString(this.fileData);
      reader.onload = (_event) => {
        let data = {
          "FileBase64String": btoa(_event.target.result.toString())
        }
        console.log(data);
        this.http
          .put<any>(GlobalConstants.apiURL + "api/tenant/Rules", data)
          .subscribe((res) => {
            this.loading = false;
            swal("Rules document updated!")
          }, (error: HttpErrorResponse) => {
            event = null;
            this.loading = false;
            swal("Something went wrong", "Please try again", "error");
          });
      }

    } else {
      swal("Something went wrong", "Please choose file again", "error");
    }
  }

}
