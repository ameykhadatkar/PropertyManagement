import { Component, OnInit,Optional } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common';
import swal from 'sweetalert';
import { MatDialogRef } from '@angular/material/dialog';
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
  fileData: File;
  loading: boolean;
  constructor(private http: HttpClient, public datepipe: DatePipe, private formBuilder: FormBuilder,@Optional() public dialogRef: MatDialogRef<TenantRequestComponent>) { }

  ngOnInit(): void {
    this.tenantRequestForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tenantEmail: ['', Validators.required],
      tenantPhone: [''],
      fileName:[''],
      fileBase64String: ['']
    });

  }
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
      //  this.srcResult = e.target.result;
       console.log(btoa(e.target.result.toString()));
      };
      // reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  onUploadClicked(event) {
    this.fileData = <File>event[0];
    if(this.fileData != undefined) {
      this.loading = true;
      var reader = new FileReader();
      // this.imagePath = files;
      reader.readAsBinaryString(this.fileData);
      console.log(reader.result);
      this.tenantRequestForm.controls.fileName.setValue(this.fileData.name);
      console.log(reader.result);
      reader.onload = (_event) => {
        console.log(_event.target.result);
        this.tenantRequestForm.controls.fileBase64String.setValue(btoa(_event.target.result.toString()));
          
      }
        
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
    if(this.dialogRef != undefined){
      this.dialogRef.close();
    }
   
  }

  CancelRequest(){
    if(this.dialogRef != undefined){
      this.dialogRef.close(0);
    }

  }
}
