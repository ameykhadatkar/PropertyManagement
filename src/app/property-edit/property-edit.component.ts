import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Property } from 'app/models/propertymodel';
import { PropertyManageService } from '../services/propertymanage.service';
import swal from 'sweetalert';
import { MatDialogRef } from '@angular/material/dialog';
import { Optional } from '@angular/core'; 
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.css']
})
export class PropertyEditComponent implements OnInit {
  updateProperty =1;
  constructor(private http: HttpClient, private route: ActivatedRoute,private properyManagementService:PropertyManageService,@Optional() public dialogRef: MatDialogRef<PropertyEditComponent>) { }
  id: number;
  propertyData: Property;
  loading: boolean;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['Id'];
    this.loading = true;
    if(this.id != undefined){
      this.http.get<any>('https://propertymanagemet20210611034324.azurewebsites.net/api/property/' + this.id).subscribe(data => {
        this.propertyData = data.data;
        this.loading = false;
        console.log(this.propertyData);
      });
    }
    else
    {
      this.updateProperty = 0;
      this.propertyData = {
        id:0,
        name:'',
        address:'',
        city:'',
        state:'',
        zipCode: '',
        createdDateTime: '2021-06-13T18:08:49.316Z',
        lastModifiedDateTime: '2021-06-13T18:08:49.316Z',
        preferredRent:0
      }
      this.loading = false;
    }

  }

  onFormSubmit(form: NgForm): void {
    this.loading = true;
    this.http.put<any>('https://propertymanagemet20210611034324.azurewebsites.net/api/property', this.propertyData).subscribe(data => {
      this.loading = false;
      location.href = "/#/property/" + this.propertyData.id;
    });
  }
  AddProperty(){
    this.loading = true;
    if(this.propertyData.id === 0){
      this.propertyData.preferredRent = Number(this.propertyData.preferredRent);
      this.http.post<any>('https://propertymanagemet20210611034324.azurewebsites.net/api/property', this.propertyData).subscribe(data => {
      this.loading = false;
      swal("Property has been added successfully")
      this.dialogRef.close();
    });

  }
}
  CancelProperty(){
    this.dialogRef.close(0);
  }

}
