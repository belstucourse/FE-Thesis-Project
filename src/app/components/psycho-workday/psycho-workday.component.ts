import {Component, OnInit} from '@angular/core';
import {PsychoWorkday} from '../../models/workday/psycho-workday';
import {WorkdayService} from '../../services/workday.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-psycho-workday',
  templateUrl: './psycho-workday.component.html',
  styleUrls: ['./psycho-workday.component.css']
})
export class PsychoWorkdayComponent implements OnInit {

  public displayedColumns = ['date', 'start', 'end'];
  public dataSource: PsychoWorkday[];

  constructor(private workdayService: WorkdayService,
              private authService: AuthService) {
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
    this.workdayService.getPsychoWorkdaysOnWeek(this.authService.getUserIdByToken()).subscribe((timeslots:PsychoWorkday[])=>{
      this.dataSource = timeslots;
    });
  }

  updateStartDate(el: PsychoWorkday) {

  }
}
