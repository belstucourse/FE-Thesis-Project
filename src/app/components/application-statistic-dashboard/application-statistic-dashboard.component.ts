import {Component, OnInit} from '@angular/core';
import {StatisticService} from '../../services/statistic.service';
import {StatisticContext} from '../../models/statistic/statistic-context';

@Component({
  selector: 'app-application-statistic-dashboard',
  templateUrl: './application-statistic-dashboard.component.html',
  styleUrls: ['./application-statistic-dashboard.component.scss']
})
export class ApplicationStatisticDashboardComponent implements OnInit {
  public chart1Type: string = 'bar';
  public chartDatasets = [
    {data: [2, 3, 19, 21], label: 'Пользователей'},
    {data: [1, 1, 9, 14], label: 'Встреч'},
    {data: [0, 0, 1, 12], label: 'Постов'}
  ];
  public chartLabels: Array<any> = ['Март', 'Апрель', 'Май', 'Июнь'];
  public chartColors: Array<any> = [];
  public chart2Type: string = 'pie';
  public chartOptions: any = {
    responsive: true,
    legend: {
      labels: {
        fontColor: '#5b5f62',
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#5b5f62',
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: '#5b5f62',
        }
      }]
    }
  };

  public countOfUsers: number = 21;
  public countOfPosts: number = 12;
  public countOfEvents: number = 14;
  public userChangePercentage: number = 6;
  public postChangePercentage: number = 2;
  public eventChangePercentage: number = 10;


  constructor(private statisticService: StatisticService) {
  }

  ngOnInit(): void {
    // const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
    //   list.reduce((previous, currentItem) => {
    //     const group = getKey(currentItem);
    //     if (!previous[group]) {
    //       previous[group] = [];
    //     }
    //     previous[group].push(currentItem);
    //     return previous;
    //   }, {} as Record<K, T[]>);
    // this.statisticService.getStatistic().subscribe((statisticContext: StatisticContext) => {
    //   let months = statisticContext.statisticNumberDtos
    //     .flatMap(statisticNumbers => statisticNumbers.monthStatisticDtos)
    //     .map(months => months.month)
    //     .reduce((acc, val) => acc.concat(val), []);
    //   months = [...new Set(months)];
    //   this.chartLabels = months;
    //   // let monthStatistic = statisticContext.statisticNumberDtos
    //   //   .flatMap(statisticNumbers => statisticNumbers.monthStatisticDtos);
    //   // const result = groupBy(monthStatistic, i => i.month);
    //   let monthChart = [];
    //   for (let statisticNumber of statisticContext.statisticNumberDtos) {
    //     let type: string;
    //     switch (statisticNumber.statisticType.toString()) {
    //       case 'EVENTS_NUMBER':
    //         type = 'Количество встреч';
    //         break;
    //       case 'POSTS_NUMBER':
    //         type = 'Количество постов';
    //         break;
    //       case 'USERS_NUMBER':
    //         type = 'Количество пользователей на платформе';
    //         break;
    //     }
    //     let preparedChartObject = {
    //       label: type,
    //       data: []
    //     };
    //     for (let monthStatistic of statisticNumber.monthStatisticDtos) {
    //       preparedChartObject.data.push(monthStatistic.count);
    //     }
    //     monthChart.push(preparedChartObject);
    //   }
    //   this.chartDatasets = monthChart;
    //   this.countOfUsers = statisticContext.statisticNumberDtos.filter(stat => stat.statisticType.toString() === 'USERS_NUMBER')[0].currentNumber;
    //   this.countOfPosts = statisticContext.statisticNumberDtos.filter(stat => stat.statisticType.toString() === 'POSTS_NUMBER')[0].currentNumber;
    //   this.countOfEvents = statisticContext.statisticNumberDtos.filter(stat => stat.statisticType.toString() === 'EVENTS_NUMBER')[0].currentNumber;
    //   this.userChangePercentage = statisticContext.statisticNumberDtos.filter(stat => stat.statisticType.toString() === 'USERS_NUMBER')[0].changePercentage;
    //   this.postChangePercentage = statisticContext.statisticNumberDtos.filter(stat => stat.statisticType.toString() === 'POSTS_NUMBER')[0].changePercentage;
    //   this.eventChangePercentage = statisticContext.statisticNumberDtos.filter(stat => stat.statisticType.toString() === 'EVENTS_NUMBER')[0].changePercentage;
    // });
  }

  isNaNStat(eventChangePercentage: number) {
    return isNaN(eventChangePercentage);
  }
}
