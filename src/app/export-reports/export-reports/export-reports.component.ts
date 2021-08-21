import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Property } from 'app/models/propertymodel';
import { ExcelService } from 'app/services/excel.service';
import { catchError, retry, map, startWith } from "rxjs/operators";
import * as FileSaver from 'file-saver';
import swal from 'sweetalert';
import { Properties } from 'xlsx/types';

@Component({
  selector: 'app-export-reports',
  templateUrl: './export-reports.component.html',
  styleUrls: ['./export-reports.component.css']
})
export class ExportReportsComponent implements OnInit {
  transactionModeTypes: any;
  properties: any;
  propertyFilteredOptions: any;
  propertyControl = new FormControl();
  propertyId: any;
  transactionMode: any;
  selectedReport : any;
  startDate: any;
  endDate: any;
  exportData: any = [];
  loading: boolean;
  reportTypes: any = [];
  showProperty = 0;
  postrequest: any = [];
  selectedProperty = "";
  constructor(private http: HttpClient, private excelService: ExcelService) { }

  ngOnInit(): void {
    this.loading = true;
    this.transactionModeTypes = [{
      id: 1,
      transactionMode: "Checking Account"
    }, {
      id: 2,
      transactionMode: "Credit Card"
    }];
    this.reportTypes = [{
      id:1,
      report: "BankCheckingAccount"
    },
    {
      id:1,
      report: "BankCreditCard"
    } , {
      id:1,
      report: "IndividualProperty"
    },{
      id:1,
      report: "AllPropertiesAccount"
    },{
      id:1,
      report: "GeneralExpenseAccount"
    }]

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

  }

  private _filter(name: string): Property[] {
    const filterValue = name.toLowerCase();
    return this.properties.filter((option) => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  export() {
    // if (this.propertyControl.invalid) {
    //   swal("Property is required", "Please select Property", "info");
    //   return false;
    // }
  var APIurl = 'https://propertymanagemet20210611034324.azurewebsites.net/api/Export/'
  if (this.selectedReport === 'IndividualProperty') 
   {
        if (this.propertyControl.invalid) {
          swal("Property is required for Individual Report Type", "Please select Property", "info");
          return false;
       }
        APIurl = APIurl + 'IndividualProperty/'+this.propertyId +'?startdate='+this.startDate+'&enddate='+this.endDate
   }
   else {
    APIurl = APIurl + this.selectedReport+'?startdate='+this.startDate+'&enddate='+this.endDate
    
   }
    this.loading = true;
    this.http
      .post<any>(APIurl,'')
      .subscribe((result) => {
        this.loading = false;
        if (result.message == "Created") {
          this.exportData.push(result.data)
          //this.excelService.exportAsExcelFile(this.exportData, result.data);          
          FileSaver.saveAs(result.data, this.selectedReport+ '_export_' + new Date().getTime() + '.xlsx');
        } else {
          swal("No data available", "No data available for this filter", "info");
        }
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          swal("Something went wrong", "Please try again", "error");
        });

  }

  setPropertyId(item,event : any) {
    if (event.isUserInput) {
      this.propertyId = item.id;
    }  
  }
  ShowProperties(reports)  {
    
    if(this.selectedReport === 'IndividualProperty'){
      this.showProperty = 1;
    }
    else {
      this.showProperty = 0;
    }
  }
}
