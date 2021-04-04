import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class DigitService {
    private pressedDigit = new Subject<any>();
    private screenWatcher = new Subject<string>();
    private pressedOperator = new Subject<string>();

    // Press any digit as observerable
    passDigit(digit: any) {
        this.pressedDigit.next(digit);
    }

    // Press any operator as observerable
    passOperator(operator: any) {
        this.pressedOperator.next(operator);
    }

    // On screen methods observerable
    onScreenMethods(type: string) {
        this.screenWatcher.next(type)
    }

    watchScreenMethods(): Observable<string> {
        return this.screenWatcher.asObservable();
    }

    getDigit(): Observable<any> {
        return this.pressedDigit.asObservable();
    }

    getOperator(): Observable<any> {
        return this.pressedOperator.asObservable();
    }
}