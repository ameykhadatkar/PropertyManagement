import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Property } from 'app/models/propertymodel';
import { ExcelService } from 'app/services/excel.service';
import { catchError, retry, map, startWith } from "rxjs/operators";
import swal from 'sweetalert';

@Component({
  selector: 'app-document-storage',
  templateUrl: './document-storage.component.html',
  styleUrls: ['./document-storage.component.css']
})
export class DocumentStorageComponent implements OnInit {

  transactionModeTypes: any;
  properties: any;
  propertyFilteredOptions: any;
  propertyControl = new FormControl();
  propertyId: any;
  transactionMode: any;
  startDate: any;
  endDate: any;
  exportData: any = [];
  loading: boolean;
  fileData: File;
  documentList: any;

  constructor(private http: HttpClient, private excelService: ExcelService) { }

  ngOnInit(): void {
    this.loading = true;
    this.http
      .get<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/property")
      .subscribe((data) => {
        this.loading = false;
        this.properties = data.records;
        console.log(this.properties);
        this.propertyFilteredOptions = this.propertyControl.valueChanges.pipe(
          startWith(""),
          map((value) => (typeof value === "string" ? value : value.name)),
          map((name) => (name ? this._filter(name) : this.properties.slice()))
        );
      });

    this.getDocuments();

  }

  private _filter(name: string): Property[] {
    const filterValue = name.toLowerCase();
    return this.properties.filter((option) => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onUploadClicked(event) {
    if (this.propertyId == undefined) {
      swal("Something went wrong", "Please select property", "error");
      return;
    }
    this.fileData = <File>event[0];
    if(this.fileData != undefined) {
      this.loading = true;
      var reader = new FileReader();
      // this.imagePath = files;
      reader.readAsDataURL(this.fileData);
      console.log(reader.result);
  
      console.log(reader.result);
      reader.onload = (_event) => {
        console.log(_event.target.result);
        let data = {
          "fileName": this.fileData.name,
          "base64String":btoa(_event.target.result.toString()),
          "propertyId": this.propertyId,
          "tenantRequestId": 0
        }
        console.log(data);
        this.http
          .post<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/DocumentStorage", data)
          .subscribe((res) => {
            this.loading = false;
            swal("Document has been added successfully")
            this.getDocuments();
            console.log(res);
          }, (error: HttpErrorResponse) => {
            event = null;
            this.loading = false;
            swal("Something went wrong", "Please try again", "error");
          });
      }

    } else {
      swal("Something went wrong", "Please choose file again", "error");
    }
  }

  getDocuments() {
    this.http
      .get<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/DocumentStorage/list/1")
      .subscribe((res) => {
        this.loading = false;
        if (res.message == "Success") {
          this.documentList = res.records;
        }
        console.log(res);
      }, (error: HttpErrorResponse) => {
        this.loading = false;
          swal("Something went wrong", "Please try again", "error");
      });
  }

  setPropertyId(item) {
    this.propertyId = item.id;
  }

}
