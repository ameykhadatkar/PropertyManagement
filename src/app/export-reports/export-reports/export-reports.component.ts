import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Property } from 'app/models/propertymodel';
import { ExcelService } from 'app/services/excel.service';
import { catchError, retry, map, startWith } from "rxjs/operators";
import swal from 'sweetalert';

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
  startDate: any;
  endDate: any;
  exportData: any = [];
  loading: boolean;

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
    if (this.propertyControl.invalid) {
      swal("Property is required", "Please select Property", "info");
      return false;
    }
    this.loading = true;

    this.http
      .get<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/Report/PropertyEvaluation/" + this.propertyId)
      .subscribe((result) => {
        this.loading = false;
        if (result.message == "Success") {
          this.exportData.push(result.data)
          this.excelService.exportAsExcelFile(this.exportData, 'export-to-excel');
        } else {
          swal("No data available", "No data available for this filter", "info");
        }
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          swal("Something went wrong", "Please try again", "error");
        });

  }

  setPropertyId(item) {
    this.propertyId = item.id;
  }

}
