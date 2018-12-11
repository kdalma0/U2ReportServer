import { Component, Input, OnChanges, SimpleChanges, SimpleChange, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LayoutService } from '../../../@core/data/layout.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ElectricityService } from '../../../@core/data/electricity.service';
import { environment } from '../../../../environments/environment';

@Pipe({
  name: 'reverse',
  pure: false
})

export class ReversePipe implements PipeTransform {
  transform(values: any) {
    if (values) {
      return values.reverse();
    }
  }
}

@Component({
  selector: 'ngx-graph',
  styleUrls: ['./graph.component.scss'],
  templateUrl: './graph.component.html',
})
export class GraphComponent implements OnChanges, OnDestroy {

  @Input() groupName: string = '';
  @Input() testName: string = '';

  passGate: number;
  lastTestTime: string = ':';
  lastPassRate: number = 0;
  lastPassCount: number = 0;
  lastFailCount: number = 0;
  lastMatchingRate: number = 0;

  currentTheme: string;
  passOption: any;
  compareOption: any;
  passData: Array<any>;
  compareData: Array<any>;
  echartsIntance1: any;
  echartsIntance2: any;

  listdata: Array<any>;

  selPassGate = 'Pass Gate : 90%';
  selPassGates = ['Pass Gate : 95%', 'Pass Gate : 90%', 'Pass Gate : 85%', 'Pass Gate : 80%', 'Pass Gate : 75%', 'Pass Gate : 70%'];

  themeSubscription: any;

  constructor(private eService: ElectricityService,
              private themeService: NbThemeService,
              private http: HttpClient,
              private theme: NbThemeService,
              private layoutService: LayoutService,
              private router: Router) {

    this.currentTheme = 'corporate';
    this.themeSubscription = this.themeService.getJsTheme().subscribe();

    this.layoutService.onChangeLayoutSize()
      .subscribe(() => this.resizeChart());
  }

  ngOnChanges(changes: SimpleChanges) {
    const group: SimpleChange = changes.groupName;
    const test: SimpleChange = changes.testName;

    if (group == undefined && test == undefined) {
      return;
    }

    this.requestChartData();
  }

  requestChartData() {
    this.http
      .get<any>(environment.apiBase + '/api/file/' + this.groupName + '/' + this.testName + '/history')
      .subscribe(history => {
        this.passGate = history.passgate;
        this.selPassGate = 'Pass Gate : ' + history.passgate + '%';
        this.listdata = history.datas;
        this.drawChart(history.datas);
      });
  }

  onChartInit1(echarts) {
    this.echartsIntance1 = echarts;
  }

  onChartInit2(echarts) {
    this.echartsIntance2 = echarts;
  }

  resizeChart() {
    if (this.echartsIntance1) {
      this.echartsIntance1.resize();
    }
    if (this.echartsIntance2) {
      this.echartsIntance2.resize();
    }
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  drawChart(datas: Array<any>): void {

    this.passData = datas.map((obj, index) => ({
      label: obj.testDate + ' ' + obj.testTime,
      value: obj.passRate
    }));
    this.compareData = datas.map((obj, index) => ({
      label: obj.testDate + ' ' + obj.testTime,
      value: obj.avgRate
    }));
    const size = datas.length;
    if (size > 0) {
      this.lastTestTime = datas[size - 1].testDate + ' ' + datas[size - 1].testTime;
      this.lastPassRate = datas[size - 1].passRate;
      this.lastPassCount = datas[size - 1].passCount;
      this.lastFailCount = datas[size - 1].failCount;
      this.lastMatchingRate = datas[size - 1].avgRate;
    }

    this.theme.getJsTheme()
      .subscribe(config => {
        const eTheme: any = config.variables.electricity;

        this.passOption = {
          grid: {
            left: 20,
            top: 0,
            right: 20,
            bottom: 30,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              lineStyle: {
                color: eTheme.tooltipLineColor,
                width: eTheme.tooltipLineWidth,
              },
            },
            textStyle: {
              color: eTheme.tooltipTextColor,
              fontSize: 20,
              fontWeight: eTheme.tooltipFontWeight,
            },
            position: 'top',
            backgroundColor: eTheme.tooltipBg,
            borderColor: eTheme.tooltipBorderColor,
            borderWidth: 3,
            formatter: '{b0}<br/>Pass Rate : {c0} %',
            extraCssText: eTheme.tooltipExtraCss,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            offset: 25,
            data: this.passData.map(i => i.label),
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: eTheme.xAxisTextColor,
              fontSize: 18,
            },
            axisLine: {
              lineStyle: {
                color: eTheme.axisLineColor,
                width: '2',
              },
            },
          },
          yAxis: {
            boundaryGap: [0, '5%'],
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: eTheme.yAxisSplitLine,
                width: '1',
              },
            },
          },
          series: [
            {
              type: 'line',
              smooth: true,
              symbolSize: 20,
              itemStyle: {
                normal: {
                  opacity: 0,
                },
                emphasis: {
                  color: '#ffffff',
                  borderColor: eTheme.itemBorderColor,
                  borderWidth: 2,
                  opacity: 1,
                },
              },
              lineStyle: {
                normal: {
                  width: eTheme.lineWidth,
                  type: eTheme.lineStyle,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: eTheme.lineGradFrom,
                  }, {
                    offset: 1,
                    color: eTheme.lineGradTo,
                  }]),
                  shadowColor: eTheme.lineShadow,
                  shadowBlur: 6,
                  shadowOffsetY: 12,
                },
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: eTheme.areaGradFrom,
                  }, {
                    offset: 1,
                    color: eTheme.areaGradTo,
                  }]),
                },
              },
              data: this.passData.map(i => i.value),
            },

            {
              type: 'line',
              smooth: true,
              symbol: 'none',
              lineStyle: {
                normal: {
                  width: eTheme.lineWidth,
                  type: eTheme.lineStyle,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: eTheme.lineGradFrom,
                  }, {
                    offset: 1,
                    color: eTheme.lineGradTo,
                  }]),
                  shadowColor: eTheme.shadowLineDarkBg,
                  shadowBlur: 14,
                  opacity: 1,
                },
              },
              data: this.passData.map(i => i.value),
            },
          ],
        };

        this.compareOption = {
          grid: {
            left: 20,
            top: 10,
            right: 20,
            bottom: 30,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              lineStyle: {
                color: eTheme.tooltipLineColor,
                width: eTheme.tooltipLineWidth,
              },
            },
            textStyle: {
              color: eTheme.tooltipTextColor,
              fontSize: 20,
              fontWeight: eTheme.tooltipFontWeight,
            },
            position: 'top',
            backgroundColor: eTheme.tooltipBg,
            borderColor: eTheme.tooltipBorderColor,
            borderWidth: 3,
            formatter: '{b0}<br/>Compare Rate : {c0} %',
            extraCssText: eTheme.tooltipExtraCss,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            offset: 25,
            data: this.compareData.map(i => i.label),
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: eTheme.xAxisTextColor,
              fontSize: 18,
            },
            axisLine: {
              lineStyle: {
                color: eTheme.axisLineColor,
                width: '2',
              },
            },
          },
          yAxis: {
            boundaryGap: [0, '5%'],
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: eTheme.yAxisSplitLine,
                width: '1',
              },
            },
          },
          series: [
            {
              type: 'line',
              smooth: true,
              symbolSize: 20,
              itemStyle: {
                normal: {
                  opacity: 0,
                },
                emphasis: {
                  color: '#ffffff',
                  borderColor: eTheme.itemBorderColor,
                  borderWidth: 2,
                  opacity: 1,
                },
              },
              lineStyle: {
                normal: {
                  width: eTheme.lineWidth,
                  type: eTheme.lineStyle,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: eTheme.lineGradFrom,
                  }, {
                    offset: 1,
                    color: eTheme.lineGradTo,
                  }]),
                  shadowColor: eTheme.lineShadow,
                  shadowBlur: 6,
                  shadowOffsetY: 12,
                },
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: eTheme.areaGradFrom,
                  }, {
                    offset: 1,
                    color: eTheme.areaGradTo,
                  }]),
                },
              },
              data: this.compareData.map(i => i.value),
            },

            {
              type: 'line',
              smooth: true,
              symbol: 'none',
              lineStyle: {
                normal: {
                  width: eTheme.lineWidth,
                  type: eTheme.lineStyle,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: eTheme.lineGradFrom,
                  }, {
                    offset: 1,
                    color: eTheme.lineGradTo,
                  }]),
                  shadowColor: eTheme.shadowLineDarkBg,
                  shadowBlur: 14,
                  opacity: 1,
                },
              },
              data: this.compareData.map(i => i.value),
            },
          ],
        };
      });
  }

  moveGallery(id) {
    console.log('/pages/gallery/' + this.groupName + '/' + this.testName + '/' + id);
    this.router.navigateByUrl('/pages/gallery/' + this.groupName + '/' + this.testName + '/' + id);
  }

  chagePassGate(gate: string) {
    let gatePass = gate.replace('%', '').substring(12);
    this.selPassGate = gate;

    this.http
      .get<any>(environment.apiBase + '/api/file/' + this.groupName + '/' + this.testName + '/' + gatePass + '/generate')
      .subscribe(gen => {
        console.log(gen);
        this.requestChartData();
      });
  }
}
