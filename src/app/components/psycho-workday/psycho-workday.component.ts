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

    });
  }

  ngOnInit(): void {
  }

  updateStartDate(el: PsychoWorkday) {

  }
}

export interface Element {
  name: string;
  symbol: string;
  comment?: string;
}

const initialData: Element[] = [
  {name: 'Hydrogen', symbol: 'H'},
  {name: 'Helium', symbol: 'He'},
  {name: 'Lithium', symbol: 'Li'},
  {name: 'Beryllium', symbol: 'Be'},
  {name: 'Boron', symbol: 'B'},
  {name: 'Carbon', symbol: 'C'},
  {name: 'Nitrogen', symbol: 'N'},
  {name: 'Oxygen', symbol: 'O'},
  {name: 'Fluorine', symbol: 'F'},
  {name: 'Neon', symbol: 'Ne'},
  {name: 'Sodium', symbol: 'Na'},
  {name: 'Magnesium', symbol: 'Mg'},
  {name: 'Aluminum', symbol: 'Al'},
  {name: 'Silicon', symbol: 'Si'},
  {name: 'Phosphorus', symbol: 'P'},
  {name: 'Sulfur', symbol: 'S'},
  {name: 'Chlorine', symbol: 'Cl'},
  {name: 'Argon', symbol: 'Ar'},
  {name: 'Potassium', symbol: 'K'},
  {name: 'Calcium', symbol: 'Ca'},

}
