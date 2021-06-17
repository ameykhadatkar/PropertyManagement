import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common';
import swal from 'sweetalert';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
@Component({
  selector: 'app-tenantrequest',
  templateUrl: './tenantrequest.component.html',
  styleUrls: ['./tenantrequest.component.css']
})
export class TenantRequestComponent implements OnInit {
  tenantRequest:any= [];
  title = ""
  tenantRequestForm: FormGroup;
  signupForm:FormGroup
  constructor(private http: HttpClient, public datepipe: DatePipe, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.tenantRequestForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tenantEmail: ['', Validators.required],
      tenantPhone: [''],
      fileBase64String: ['']
    });

  }
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
       // this.srcResult = e.target.result;
      };
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
  AddRequest(){
    this.http
    .post<any>(" https://propertymanagemet20210611034324.azurewebsites.net/api/TenantRequest",this.tenantRequestForm.value)
    .subscribe((data) => {
      swal("Your Request Has Been Submitted!")
      this.tenantRequestForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        tenantEmail: ['', Validators.required],
        tenantPhone: [''],
        fileBase64String: ['']
      });
    });
  }
}
