import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PsychoWorkday} from '../../models/workday/psycho-workday';
import {WorkdayService} from '../../services/workday.service';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {UserService} from '../../services/user.service';
import {MatTable} from '@angular/material/table';
import {DateTimeCalculator} from '../../services/date-time-calculator.service';

@Component({
  selector: 'app-psycho-workday',
  templateUrl: './psycho-workday.component.html',
  styleUrls: ['./psycho-workday.component.css']
})

export class PsychoWorkdayComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;


  public displayedColumns = ['date', 'start', 'end'];
  public dataSource: PsychoWorkday[];
  public selectedStartTime: string;
  public selectedEndTime: string;
  workdayForm: FormGroup;
  @Input()
  isActiveProfile: boolean = false;

  constructor(private workdayService: WorkdayService,
              private authService: AuthService,
              private atp: AmazingTimePickerService,
              private userService: UserService,
              private dateTimeCalculator: DateTimeCalculator) {
    this.workdayForm = new FormGroup({
      date: new FormControl('', [Validators.required])
    });
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
    this.workdayService.getPsychoWorkdaysOnWeek(this.authService.getUserIdByToken()).subscribe((timeslots: PsychoWorkday[]) => {
      this.dataSource = timeslots;
    });

  }

  updateStartDate(el: PsychoWorkday) {

  }

  addWorkday() {
    let date = this.workdayForm.controls['date'].value;
    let dateStart = this.dateTimeCalculator.calculate(date, this.selectedStartTime);
    let dateEnd = this.dateTimeCalculator.calculate(date, this.selectedEndTime);


    let workday: PsychoWorkday = {
      psychologistId: this.authService.getUserIdByToken(),
      date: date,
      startDateTime: dateStart,
      endDateTime: dateEnd,
    };

    this.workdayService.saveTimeslot(workday).subscribe((workdayRes: PsychoWorkday) => {
      this.dataSource.push(workdayRes);
      this.table.renderRows();
    });
  }

  openStart() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedStartTime = time;
    });
  }

  openEnd() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedEndTime = time;
    });
  }
}
