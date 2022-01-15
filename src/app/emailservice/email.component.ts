import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { GlobalConstants } from 'app/global-constants';
import swal from 'sweetalert';
@Component({
  selector: 'email-service',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  tenant: any = [];
  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  ngOnInit(): void {
    const headers = {
      Authorization: "Bearer my-token",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    };
    this.tenant = {
      toEmails : "",
      ccEmails: "",
      subject: "",
      body: ""

    }
    if (sessionStorage.getItem("toEmail") != null) {
      this.tenant.toEmails = sessionStorage.getItem("toEmail");
        toEmails : sessionStorage.getItem("toEmail");
    }
   
 }
 sendEmail() {
  this.http.post<any>(GlobalConstants.apiURL + "api/Notification/manual" ,this.tenant ).subscribe((data) => {
    if(data.responseCode = 'OK'){
      alert("email has been sent");
    }
  });
}
cancelEmail(){
  location.href = "/#/tenant";
}
}
