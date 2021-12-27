import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EmailComponent } from '../emailservice/email.component';
@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {
  transactions: Array<any>;
  tenantList : any = [];
  tenantUpdate : any = [];
  disableEdit = 0;
  pageNumber: number;
  maxPage: number;
  emailComponent : EmailComponent
  constructor(private http: HttpClient, public datepipe: DatePipe,private dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.pageNumber = 1;
    this.loadPage(this.pageNumber);

   }

   loadPage(pageNumber){
    this.http
    .get<any>(" https://propertymanagemet20210611034324.azurewebsites.net/api/Tenant/list/" + this.pageNumber)
    .subscribe((data) => {
     // this.tenantList = data.records;
      this.maxPage = Math.floor(data.totalRecords / 10) + 1;
      this.tenantList = [];
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
          propertyId:element.propertyId,
          propertyName:element.propertyName,
          editMode:0
        })});
        this.disableEdit = 1;
    });
   }

  next(): void {
    this.pageNumber = this.pageNumber + 1;
    this.loadPage(this.pageNumber);
  }

  previous(): void {
    this.pageNumber = this.pageNumber - 1;
    this.loadPage(this.pageNumber);
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

  sendEmail(emailId) {
    sessionStorage.setItem("toEmail",emailId );
    const dialogref = this.dialog.open(EmailComponent, {
      width: '50%',
      height: 'auto',
      maxHeight: '70%',
      // disableClose: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      data: {}
    });
  }
}
