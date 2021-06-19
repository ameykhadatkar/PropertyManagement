import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Property } from "app/models/propertymodel";
import { MatDialog } from '@angular/material/dialog';
import { PropertyEditComponent } from '../property-edit/property-edit.component';
import { PropertyManageService } from '../services/propertymanage.service';
import swal from 'sweetalert';
@Component({
  selector: "app-properties",
  templateUrl: "./properties.component.html",
  styleUrls: ["./properties.component.css"],
})
export class PropertiesComponent implements OnInit {
  properties: Array<Property>;
  loading: boolean;
  propertyEditComponent : PropertyEditComponent
  evalutions: any;
  active: boolean = false;
  constructor(private http: HttpClient,private dialog: MatDialog,private propertyManagementService:PropertyManageService) {
  
  }

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
  AddNewProperty(){
    const dialogref = this.dialog.open(PropertyEditComponent, {
      width: '50%',
      height: 'auto',
      maxHeight: '70%',
      // disableClose: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      data: {}
    });
    dialogref.afterClosed().subscribe(dialogResult => {
      if (dialogResult != 0) {
        this.loading = true;
        this.http
          .get<any>("https://propertymanagemet20210611034324.azurewebsites.net//api/property")
          .subscribe((data) => {
            this.loading = false;
    
            this.properties = data.records;
            console.log(this.properties);
          });
      }
    });
  }
  deleteProperty(propertyId: number): void {
    this.loading = true;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this property",
      icon: "warning",
      buttons: [
        'Cancel',
        'OK'
      ],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.http.delete<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/Property/" + propertyId).subscribe((data) => {
          if (data.responseCode = 'OK') {
            this.loading = false;
    
            swal("Property has been removed")
            this.loading = false
            this.properties.forEach((value, index) => {
              if (value.id === propertyId) this.properties.splice(index, 1);
            });
    
          }
        });
      } else {
        this.loading = false
      }
    });

  }

  getPropertyEvalutionDetails(id) {
    this.evalutions = [];
    this.loading = true;
    
    this.http
      .get<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/Report/PropertyEvaluation/"+id)
      .subscribe((data) => {
        this.loading = false;
        if(data.message == "Success") {
          this.evalutions = data.data;
        }
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        swal("Something went wrong", "Please try again", "error");
      });
  }

  toggleClick(event) {
    this.active = event.checked;
    console.log(event.checked);
  }
}
