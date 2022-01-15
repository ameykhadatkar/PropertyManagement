import { Component, OnInit,Optional } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { GlobalConstants } from 'app/global-constants';
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
  RepairableEntity: string;
  RepairableEntities: string[];
  other: string;
  showOther: boolean;
  constructor(private http: HttpClient, public datepipe: DatePipe, private formBuilder: FormBuilder,@Optional() public dialogRef: MatDialogRef<TenantRequestComponent>) { }

  ngOnInit(): void {
    this.tenantRequestForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tenantEmail: ['', Validators.required],
      tenantPhone: [''],
      fileName:[''],
      fileBase64String: [''],
      RepairableEntity: [''],
      tenantName: ['', Validators.required],
      PropertyAddress: ['', Validators.required]
    });

    this.http
      .get<any>(GlobalConstants.apiURL + "api/tenantrequest/RepairableItems")
      .subscribe((data) => {
        this.RepairableEntities = data.data;
        this.RepairableEntities.push("Other");
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
      console.log(data);
      if(data.responseCode != 'BadRequest'){
        swal("Your Request Has Been Submitted!")
        this.tenantRequestForm = this.formBuilder.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
          tenantEmail: ['', Validators.required],
          tenantPhone: [''],
          fileName:[''],
          fileBase64String: [''],
          RepairableEntity: [''],
          tenantName: ['', Validators.required],
          PropertyAddress: ['', Validators.required]
        });
        if(this.dialogRef != undefined){
          this.dialogRef.close();
        }
      } else {
        swal(data.message);
      }
    }, (error) => {
      
      swal(error.error.message);
    });
  }

  showOthers()  {
    
    if(this.RepairableEntity === 'Other'){
      this.showOther = true;
    }
    else {
      this.showOther = false;
    }
  }

  CancelRequest(){
    if(this.dialogRef != undefined){
      this.dialogRef.close(0);
    }

  }
}
