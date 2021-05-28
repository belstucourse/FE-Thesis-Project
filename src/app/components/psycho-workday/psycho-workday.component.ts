import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PsychoWorkday} from '../../models/workday/psycho-workday';
import {WorkdayService} from '../../services/workday.service';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {UserService} from '../../services/user.service';
import {MatTable} from "@angular/material/table";

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
  isActiveProfile:boolean=false;

  constructor(private workdayService: WorkdayService,
              private authService: AuthService,
              private atp: AmazingTimePickerService,
              private userService: UserService) {
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
    let startHoursString = this.selectedStartTime.charAt(0) + this.selectedStartTime.charAt(1);
    let startMinutesString = this.selectedStartTime.charAt(3) + this.selectedStartTime.charAt(4);
    let startHours : number = +startHoursString
    let startMinutes : number = +startMinutesString
    let dateStart = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), startHours + 3, startMinutes)


    let endHoursString = this.selectedEndTime.charAt(0) + this.selectedEndTime.charAt(1);
    let endMinutesString = this.selectedEndTime.charAt(3) + this.selectedEndTime.charAt(4);
    let endHours : number = +endHoursString
    let endMinutes : number = +endMinutesString
    let dateEnd = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), endHours + 3, endMinutes)

    let workday: PsychoWorkday = {
      psychologistId: this.authService.getUserIdByToken(),
      date: date,
      startDateTime: dateStart,
      endDateTime: dateEnd,
    };

    this.workdayService.saveTimeslot(workday).subscribe((workdayRes:PsychoWorkday)=>{
        this.dataSource.push(workdayRes)
      this.table.renderRows();
    })
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
