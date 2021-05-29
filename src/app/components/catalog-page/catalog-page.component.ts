import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Tag} from '../../models/user/tag';
import {Psychologist} from '../../models/user/psychologist';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {DateTimeCalculator} from '../../services/date-time-calculator.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {
  public psychologists: Psychologist[];
  public totalPages: number;
  public first: boolean;
  public last: boolean;
  public number: number;
  public size: number;
  public numberOfElements: number;
  psychologistTags: Tag[] = [
    {
      name: 'Психолог (общая психология)',
      selected: false
    },
    {
      name: 'Бизнес-Психолог (корпоративный психолог)',
      selected: false
    },
    {
      name: 'Транспортный Психолог',
      selected: false
    },
    {
      name: 'Спортивный Психолог',
      selected: false
    },
    {
      name: 'Социальный Психолог',
      selected: false
    },
    {
      name: 'Психоаналитик',
      selected: false
    },
    {
      name: 'Педагогический Психолог',
      selected: false
    },
    {
      name: 'Коммуникационный Психолог',
      selected: false
    },
    {
      name: 'Клинический Психолог',
      selected: false
    },
    {
      name: 'Детский и Юнешеский Психотерапевт',
      selected: false
    },
    {
      name: 'Психолог Здравоохранения и Реабилитации',
      selected: false
    },
    {
      name: 'Врач, психосоматическая медицина и психотерапия',
      selected: false
    },
    {
      name: 'Врач, психиатрия и психотерапия',
      selected: false
    }
  ];
  public datePickerForm: FormGroup;
  public selectedStartTime: string;
  public selectedEndTime: string;

  constructor(private userService: UserService,
              private atp: AmazingTimePickerService,
              private dateTimeCalculator: DateTimeCalculator) {
    this.datePickerForm = new FormGroup({
      date: new FormControl('', [Validators.required])
    });
  }

  public changeSelected(psychologist: Tag) {
    psychologist.selected = !psychologist.selected;
    let tagNames = this.psychologistTags.filter(value => value.selected === true).map(value => value.name);
    this.userService.getDoctorsByTagNames(tagNames).subscribe(page => {
      this.psychologists = page.content;
      this.totalPages = page.totalPages;
      this.first = page.first;
      this.last = page.last;
      this.number = page.number;
      this.size = page.size;
      this.numberOfElements = page.numberOfElements;
    });
  }

  ngOnInit(): void {
  }

  searchPsychos(psychologist: Tag) {
    if (psychologist !== null) {
      psychologist.selected = !psychologist.selected;
    }
    let tagNames = this.psychologistTags.filter(value => value.selected === true).map(value => value.name);
    let date = this.datePickerForm.controls['date'].value;
    let dateStart = this.dateTimeCalculator.calculate(date, this.selectedStartTime);
    let dateEnd = this.dateTimeCalculator.calculate(date, this.selectedEndTime);
    this.userService.getDoctorsByTagNamesAndWorkday(tagNames, dateStart, dateEnd).subscribe(page => {
      this.psychologists = page.content;
      this.totalPages = page.totalPages;
      this.first = page.first;
      this.last = page.last;
      this.number = page.number;
      this.size = page.size;
      this.numberOfElements = page.numberOfElements;
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

  reset() {
    this.datePickerForm.reset();
    this.selectedStartTime = null;
    this.selectedEndTime = null;
  }
}
