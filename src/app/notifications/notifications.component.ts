import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert';
import { TenantRequestComponent } from '../tenantrequest/tenantrequest.component';

declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  loading: boolean;
  notifications: any;
  tenantRequestComponent : TenantRequestComponent;
  constructor(private http: HttpClient,private dialog: MatDialog) { }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.loading = true;
    this.http.get<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/TenantRequest").subscribe((data) => {
      this.loading = false;
      if (data.message == "Success") {
        this.notifications = data.records;
      }
    },
      (error: HttpErrorResponse) => {
        this.loading = false;
        swal("Something went wrong", "Please try again", "error");
      });
  }
  AddServiceRequest(){
    const dialogref = this.dialog.open(TenantRequestComponent, {
      width: '50%',
      height: 'auto',
      maxHeight: '90%',
      // disableClose: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      data: {}
    });
    dialogref.afterClosed().subscribe(dialogResult => {
      if (dialogResult != 0) {
        this.getNotifications();
      }
    });

  }
  closeRequest(notifications) {
    /*this.loading = true;
    let data = {
      "id": notifications.id,
      "title": "string",
      "description": "string",
      "tenantEmail": "string",
      "tenantPhone": "string",
      "fileBase64String": "string"
    }
    this.http.put<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/TenantRequest", data).subscribe((data) => {
      this.loading = false;
      if (data.message == "Success") {
        this.getNotifications();
      }
    },
      (error: HttpErrorResponse) => {
        this.loading = false;
        swal("Something went wrong", "Please try again", "error");
      });*/
  }

  updateStatus(notifications) {
    this.loading = true;
    let data = {
      "id": notifications.id,
      "title": notifications.title,
      "description": notifications.description,
      "tenantEmail": notifications.tenantEmail,
      "tenantPhone": notifications.tenantPhone,
      "fileBase64String": notifications.fileBase64String,
      "status": "Completed"
    }
    this.http.put<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/TenantRequest", data).subscribe((data) => {
      this.loading = false;
      if (data.message == "Success") {
        swal("Success", "This request has been closed.", "info");
        this.getNotifications();
      }
    },
      (error: HttpErrorResponse) => {
        this.loading = false;
        swal("Something went wrong", "Please try again", "error");
      });
  }
}
