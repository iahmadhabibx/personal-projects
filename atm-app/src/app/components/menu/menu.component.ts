import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SHARED_DATA from '../../shared/sharedData';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  currentAmount = SHARED_DATA.amount;
  @ViewChild('valueEntered', { static: true }) valueEntered: ElementRef;

  count_5000 = [];
  count_1000 = [];
  count_500 = [];
  constructor() { }

  ngOnInit(): void {
  }

  onWithdraw() {
    this.count_5000 = [];
    this.count_500 = [];
    this.count_1000 = [];

    var temp = +this.valueEntered.nativeElement.value;
    if (temp < 500) {
      return;
    }
    else if (temp > this.currentAmount) {
      return;
    }
    else if (temp % 500 !== 0) {
      return;
    }
    else {
      this.currentAmount = SHARED_DATA.amount = (this.currentAmount - temp);

      while (temp >= 5000) {
        temp = temp - 5000;
        this.count_5000.push(temp);
      }
      while (temp >= 2000) {
        temp -= 1000;
        this.count_1000.push(temp);
      }
      while (temp >= 500) {
        temp -= 500;
        this.count_500.push(temp);
      }
    }
  }

}
