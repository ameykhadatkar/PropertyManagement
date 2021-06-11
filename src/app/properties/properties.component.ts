import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Property } from "app/models/propertymodel";

@Component({
  selector: "app-properties",
  templateUrl: "./properties.component.html",
  styleUrls: ["./properties.component.css"],
})
export class PropertiesComponent implements OnInit {
  properties: Array<Property>;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const headers = {
      Authorization: "Bearer my-token",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    };
    this.http
      .get<any>("https://propertymanagemet20210611034324.azurewebsites.net//api/property", { headers })
      .subscribe((data) => {
        this.properties = data.records;
        console.log(this.properties);
      });
  }
}
