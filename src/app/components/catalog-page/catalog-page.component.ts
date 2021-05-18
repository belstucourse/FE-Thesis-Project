import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Tag} from '../../models/user/tag';
import {Psychologist} from '../../models/user/psychologist';

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

  constructor(private userService: UserService) {
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

}
