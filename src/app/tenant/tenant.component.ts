import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {
  transactions: Array<any>;
  tenantList : any = [];
  tenantUpdate : any = [];
  disableEdit = 0
  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  ngOnInit(): void {
    const headers = {
      Authorization: "Bearer my-token",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    };
    this.http
    .get<any>(" https://propertymanagemet20210611034324.azurewebsites.net/api/Tenant", { headers })
    .subscribe((data) => {
     // this.tenantList = data.records;
      data.records.forEach((element, index) => {
        this.tenantList.push({
          id:element.id,
          firstName:element.firstName,
          lastName:element.lastName,
          phone:element.phone,
          accountNumber : element.accountNumber,
          createdDateTime:element.createdDateTime,
          lastModifiedDateTime : element.lastModifiedDateTime,
          email:element.email,
          editMode:0
        })});
        this.disableEdit = 1;
    });

   }
  editTenant(tenant) {
    this.tenantList.map((element) => {
      if (tenant === element.id) {
        element.editMode = 1;
      }
    });
  }
  updateTenant(tenant) {
    this.tenantList.map((element) => {
      if (tenant === element.id) {
        element.editMode = 0;
     //   this.disableEdit = 0;
     const headers = {
      Authorization: "Bearer my-token",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    };
    this.tenantUpdate = {
    id:element.id,
    firstName:element.firstName,
    lastName:element.lastName,
    phone:element.phone,
    accountNumber : element.accountNumber,
    createdDateTime:element.createdDateTime,
    lastModifiedDateTime : element.lastModifiedDateTime,
    email:element.email}
     this.http
     .put<any>(" https://propertymanagemet20210611034324.azurewebsites.net/api/Tenant",this.tenantUpdate, { headers })
     .subscribe((data) => {
         this.disableEdit = 1;
     });

      }
    });
  }

  sendEmail(tenant) {
    this.tenantList.map((element) => {
      if (tenant === element.id) {
        alert("Email has been sent to " + element.name);
      }
    });
  }
}