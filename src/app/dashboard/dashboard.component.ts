import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { GlobalConstants } from 'app/global-constants';
import * as Chartist from "chartist";
import swal from 'sweetalert';


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  loading: boolean;
  notify: boolean;
  totalIncomeLast30Days= 0;
  totalExpenseLast30Days= 0;
  upcomingExpenseNext30Days =  0;
  profitPercentageLAst30Days = 0;
  constructor(private http: HttpClient) { }
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on("draw", function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function (data) {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq2 = 0;
  }
  ngOnInit() {

    this.getNotifications();
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */


    function roundUp(num, precision) {
      precision = Math.pow(10, precision);
      return Math.ceil(num * precision) / precision;
    }
    this.loading = true;
    this.http.get<any>(GlobalConstants.apiURL + "api/report/last6month").subscribe((data) => {
      this.loading = false;

      var chartData = {
        labels: [],
        series: [[]],
      };
      
      var maxValue = 100;
      var minValue = 0;
      console.log(data);
      $.each(data.records, function (i, x) {
        chartData.labels.push(x.month);
        chartData.series[0].push(x.profit);
        if (maxValue < x.profit) {
          maxValue = x.profit;
        }
        if (minValue > x.profit) {
          minValue = x.profit;
        }
      });
      this.http.get<any>(GlobalConstants.apiURL + "api/report/tiles").subscribe((data) => {
        this.totalIncomeLast30Days= data.data.totalIncomeLast30Days;
        this.totalExpenseLast30Days= data.data.totalExpenseLast30Days;
        this.upcomingExpenseNext30Days = data.data.upcomingExpenseNext30Days;
        this.profitPercentageLAst30Days = data.data.profitPercentageLAst30Days;
    });
     

      const dataDailySalesChart: any = {
        labels: ["M", "T", "W", "T", "F", "S", "S"],
        series: [[12, 17, 7, 17, 23, 18, 38]],
      };

      const optionsDailySalesChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0,
        }),
        low: minValue,
        high: maxValue, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
      };

      var dailySalesChart = new Chartist.Line("#dailySalesChart", chartData, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);
    });

    this.loading = true;

    this.http.get<any>(GlobalConstants.apiURL + "api/report/incomeexpense").subscribe((data) => {
      this.loading = false;

      var chartData = {
        labels: [],
        series: [[], []],
      };

      var propertyWiseData = data.data.propertyWiseData;
      var maxValue = 100;
      $.each(propertyWiseData, function (i, x) {
        chartData.labels.push(x.property.name);

        if (x.totalIncome > maxValue) {
          maxValue = x.totalIncome;
        }
        if (x.totalExpense > maxValue) {
          maxValue = x.totalExpense;
        }
        chartData.series[0].push(x.totalIncome);
        chartData.series[1].push(x.totalExpense);
      });

      var optionswebsiteViewsChart = {
        axisX: {
          showGrid: false,
        },
        low: 0,
        high: maxValue,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
      };
      var responsiveOptions: any[] = [
        [
          "screen and (max-width: 640px)",
          {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              },
            },
          },
        ],
      ];
      var websiteViewsChart = new Chartist.Bar("#websiteViewsChart", chartData, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
    });
  }

   getNotifications() {
    this.loading = true;

    this.http.get<any>(GlobalConstants.apiURL + "api/TenantRequest").subscribe((data) => {
      this.loading = false;
      if (data.message == "Success") {
        if(data.records.length > 0) {
          this.notify = true;
        }
      }
    },
      (error: HttpErrorResponse) => {
        this.loading = false;
        swal("Something went wrong", "Please try again", "error");
      });
  }

}
