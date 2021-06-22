import {MonthStatistic} from './month-statistic';
import {StatisticType} from './statistic-type.enum';

export interface StatisticNumber {
  currentNumber: number;
  changePercentage: number;
  monthStatisticDtos: MonthStatistic[];
  statisticType: StatisticType;
}
