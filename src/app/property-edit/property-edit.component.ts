import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Property } from 'app/models/propertymodel';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.css']
})
export class PropertyEditComponent implements OnInit {

  constructor(private http: HttpClient, private route:ActivatedRoute) { }
  id: number;
  propertyData: Property;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['Id'];
    this.http.get<any>('https://propertymanagemet20210611034324.azurewebsites.net/api/property/' + this.id).subscribe(data => {
        this.propertyData = data.data;
        console.log(this.propertyData);
    });
  }

  onFormSubmit(form:NgForm): void {
    this.http.put<any>('https://propertymanagemet20210611034324.azurewebsites.net/api/property', this.propertyData).subscribe(data => {
        location.href="/#/property/" + this.propertyData.id;
    });
  }

}
