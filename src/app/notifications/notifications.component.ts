import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  loading: boolean;
  notifications: any;

  constructor(private http: HttpClient) { }

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
}
