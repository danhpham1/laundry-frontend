import { Component, OnInit, ViewChild } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  barChartOptions!: ChartOptions;
  barChartLabels!: Label[];
  barChartType!: ChartType;
  barChartLegend: boolean;
  barChartPlugins!: Array<any>;
  barChartData!: ChartDataSets[];

  constructor() {
    this.barChartOptions = {
      responsive: true,
    };
    this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'];
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartPlugins = [];
    this.barChartData = [
      { data: [65, 59, 80, 81, 56, 55, 40, 34, 23, 12, 3], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90, 31, 21, 56, 76], label: 'Series B' }
    ]
  }

  ngOnInit(): void {

  }

  updateChart() {
    this.barChartData = [
      { data: [65, 59, 80, 81, 56, 55, 40, 0, 0, 0, 0], label: 'Series A' }
    ]
  }
}
