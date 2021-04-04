import { Component, OnInit } from '@angular/core';
import { DigitService } from '../shared/digit.service';

// Shared libraries
import SharedData from '../shared/sharedDataHolder';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  numberHolder: number = 0;
  lastDigit = SharedData.lastDigitHolder;
  constructor(private digitService: DigitService) { }

  ngOnInit(): void {
  }

  // Getting typed/pressed digits
  typeNumber(event) {
    // this.numberHolder += +event.srcElement.innerHTML;
    this.digitService.passDigit(event.srcElement.innerHTML);
  }

  // Clearing results
  clearCalculations() {
    this.digitService.onScreenMethods('clear');
  }

  // Getting typed/pressed operators
  typeOperator(event) {
    this.digitService.passOperator(event.srcElement.innerHTML);
  }

  // Evaluate results
  calculate() {
    this.digitService.onScreenMethods('calculate');
  }

  // Backspace 
  backspace() {}
}
