import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SHARED_DATA from '../../shared/sharedData';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  accountNumber = '';
  atmPin = '';
  cashAmount = 0;

  sharedData = SHARED_DATA;
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  submitData() {
    if (this.accountNumber.length == 14 && this.atmPin.length == 4) {
      this.sharedData.amount = this.cashAmount;
      this.route.navigate(['menu']);
    }
  }
}
