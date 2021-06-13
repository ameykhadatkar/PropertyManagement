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
  loading: boolean;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loading = true;
    this.http
      .get<any>("https://propertymanagemet20210611034324.azurewebsites.net//api/property")
      .subscribe((data) => {
        this.loading = false;

        this.properties = data.records;
        console.log(this.properties);
      });
  }
  deleteProperty(propertyId: number): void {
    this.loading = true;

    this.http.delete<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/Property/" + propertyId).subscribe((data) => {
      if (data.responseCode = 'OK') {
        this.loading = false;

        alert("Property has been removed")
        this.properties.forEach((value, index) => {
          if (value.id === propertyId) this.properties.splice(index, 1);
        });

      }
    });
  }
}
