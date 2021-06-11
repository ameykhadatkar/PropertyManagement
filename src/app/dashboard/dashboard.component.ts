import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as Chartist from "chartist";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient) {}
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
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const headers = {
      Authorization: "Bearer my-token",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    };
    function roundUp(num, precision) {
      precision = Math.pow(10, precision);
      return Math.ceil(num * precision) / precision;
    }

    this.http.get<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/report/last6month", { headers }).subscribe((data) => {
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

      console.log(chartData);
      console.log(maxValue);

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

    
    this.http.get<any>("https://propertymanagemet20210611034324.azurewebsites.net/api/report/incomeexpense", { headers }).subscribe((data) => {
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
}
