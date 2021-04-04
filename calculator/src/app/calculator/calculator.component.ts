import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DigitService } from '../shared/digit.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  currentNumber = '';
  operatorsArray = [];
  calculationsArray = [];
  numberHolder = '';

  @ViewChild('textArea', { static: false }) textarea: ElementRef;
  @ViewChild('results', { static: false }) results: ElementRef;

  constructor(private digitService: DigitService) {

    // If any number/digit is pressed
    this.digitService.getDigit().subscribe((digit) => {
      if (this.calculationsArray.length == 1 && this.calculationsArray[0] == '0') {
        this.calculationsArray = [];
        this.currentNumber = '';
      }
      this.numberHolder += digit;
      this.currentNumber += digit;

      this.textarea.nativeElement.innerHTML = this.currentNumber;
    });

    // If any operator is pressed
    this.digitService.getOperator().subscribe((operator) => {
      if (this.operatorsArray.length > 0 && !this.calculationsArray.includes('.')) {
        this.digitService.onScreenMethods('calculate by operator');
      }

      else {
        this.operatorsArray.push(operator);
        if (this.numberHolder != '')
          this.calculationsArray.push(this.numberHolder);
        this.currentNumber += operator;
        this.numberHolder = '';

        this.textarea.nativeElement.innerHTML = this.currentNumber;
      }
    });

    // If clear screen is pressed
    this.digitService.watchScreenMethods().subscribe((message: string) => {

      // Clear screen
      if (message === 'clear') {
        this.textarea.nativeElement.innerHTML = 0;
        this.results.nativeElement.innerHTML = '';
        this.currentNumber = '';
        this.calculationsArray = [];
        this.operatorsArray = [];
        this.numberHolder = '';
      }

      // Calculate results
      else if (message === 'calculate by operator') {
        if (this.numberHolder != '') {
          this.calculationsArray.push(this.numberHolder);
        }

        let total;
        let digit_1 = +this.calculationsArray[0];
        let digit_2 = +this.calculationsArray[1];

        this.numberHolder = '';

        // ADDING
        if (this.operatorsArray[this.operatorsArray.length - 1] == '+') {
          total = digit_1 + digit_2;
          this.results.nativeElement.innerHTML = total;
        }
        // SUBTRACTING
        else if (this.operatorsArray[this.operatorsArray.length - 1] == '-') {
          total = digit_1 - digit_2;
          this.results.nativeElement.innerHTML = total;
        }
        // MULTIPLICATION
        else if (this.operatorsArray[this.operatorsArray.length - 1] == 'x') {
          total = digit_1 * digit_2;
          this.results.nativeElement.innerHTML = total;
        }
        // DIVISION
        else if (this.operatorsArray[this.operatorsArray.length - 1] == '/') {
          total = digit_1 / digit_2;
          this.results.nativeElement.innerHTML = total.toFixed(3);
        }
        this.calculationsArray = [];

        //Re setting ongoing calculations to newer ones
        this.currentNumber = total.toString();
        if (this.currentNumber == '0') {
          this.textarea.nativeElement.innerHTML = '';
        }
        this.currentNumber += this.operatorsArray[this.operatorsArray.length - 1];
        this.textarea.nativeElement.innerHTML = this.currentNumber;

        this.calculationsArray.push(total);
        this.operatorsArray = [];
      }
      else if (message === 'calculate') {
        // To add second number in array
        if (this.numberHolder != '') {
          this.calculationsArray.push(this.numberHolder);
        }

        let total;
        let digit_1 = +this.calculationsArray[0];
        let digit_2 = +this.calculationsArray[1];

        this.numberHolder = '';

        // ADDING
        if (this.operatorsArray[this.operatorsArray.length - 1] == '+') {
          total = digit_1 + digit_2;
          this.results.nativeElement.innerHTML = total;
        }
        // SUBTRACTING
        else if (this.operatorsArray[this.operatorsArray.length - 1] == '-') {
          total = digit_1 - digit_2;
          this.results.nativeElement.innerHTML = total;
        }
        // MULTIPLICATION
        else if (this.operatorsArray[this.operatorsArray.length - 1] == 'x') {
          total = digit_1 * digit_2;
          this.results.nativeElement.innerHTML = total;
        }
        // DIVISION
        else if (this.operatorsArray[this.operatorsArray.length - 1] == '/') {
          total = digit_1 / digit_2;
          this.results.nativeElement.innerHTML = total.toFixed(3);
        }
        this.calculationsArray = [];

        //Re setting ongoing calculations to newer ones
        this.currentNumber = total.toString();
        if (this.currentNumber == '0') {
          this.textarea.nativeElement.innerHTML = '';
        }
        this.textarea.nativeElement.innerHTML = this.currentNumber;
        this.calculationsArray.push(total);
        this.operatorsArray = [];
      }
    })
  }

  ngOnInit(): void {
  }

}
