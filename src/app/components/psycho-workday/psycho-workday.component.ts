import {Component, OnInit} from '@angular/core';
import {PsychoWorkday} from '../../models/workday/psycho-workday';
import {WorkdayService} from '../../services/workday.service';

@Component({
  selector: 'app-psycho-workday',
  templateUrl: './psycho-workday.component.html',
  styleUrls: ['./psycho-workday.component.css']
})
export class PsychoWorkdayComponent implements OnInit {

  public displayedColumns = ['дата', 'начало', 'конец'];
  public dataSource: PsychoWorkday[];

  constructor(private workdayService: WorkdayService) {
  }

  updateEndDate(el: PsychoWorkday) {
    if (el == null) {
      return;
    }

    this.workdayService.updateTimeslot(el).subscribe((workday: PsychoWorkday) => {
      this.dataSource.splice(this.dataSource.indexOf(workday), 1, workday);
    });
  }

  ngOnInit(): void {
  }

  updateStartDate(el: PsychoWorkday) {

  }
}
