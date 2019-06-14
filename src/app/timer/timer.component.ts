import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { TimerService } from './timer.service';

@Component({
    selector: 'timer',
    template: ` 
        <h1>
            {{hoursDisplay ? hoursDisplay : '00'}} : {{(minutesDisplay) && (minutesDisplay <= 59) ? minutesDisplay : '00'}} : {{(secondsDisplay) && (secondsDisplay <= 59) ? secondsDisplay : '00'}} <br/>
        </h1>
    `,
    styles: [ `
        h1 {
            color: #559acec;
            margin-top: 24px; 
            text-align: center;   
        }    
    `]
})
export class TimerComponent implements OnInit, OnDestroy {
    private playWaitStopResetUnsubscribe: any;

    start = 0;
    ticks = 0;
    
    minutesDisplay: number = 0;
    hoursDisplay: number = 0;
    secondsDisplay: number = 0;

    sub: Subscription;

    constructor(private timerService: TimerService) {        
    }

    ngOnInit() {
        this.playWaitStopResetUnsubscribe = this.timerService.playWaitStopReset$.subscribe((res: any) => this.playWaitStopReset(res));
    }

    ngOnDestroy() {
        this.playWaitStopResetUnsubscribe.unsubscribe();;
    }

    private playWaitStopReset(res: any) {
        if(res.play) {
            this.startTimer();
        } else if(res.wait){
          this.waitTimer();
        } else if(res.stop) {
            this.stopTimer();
        } else if (res.reset) { 
            this.resetTimer();
        }
    }

    private startTimer() {

        let timer = Observable.timer(1, 1000);
        this.sub = timer.subscribe(
            t => {
                this.ticks = this.start + t;
                
                this.secondsDisplay = this.getSeconds(this.ticks);
                this.minutesDisplay = this.getMinutes(this.ticks);
                this.hoursDisplay = this.getHours(this.ticks);
            }
        );
    }

    private waitTimer(){
        this.start =++this.ticks;
        if (this.sub) this.sub.unsubscribe();
        setTimeout(() => {
            this.startTimer();
          }, 2000);
    }

    private stopTimer() {
        this.start = ++this.ticks;
        if (this.sub) this.sub.unsubscribe();
    }

    private resetTimer() {
        this.start = 0;
        this.ticks = 0;

        this.minutesDisplay = 0;
        this.hoursDisplay = 0;
        this.secondsDisplay = 0;
        if (this.sub) this.sub.unsubscribe();
    }

    private getSeconds(ticks: number) {
        return this.pad(ticks % 60);
    }

    private getMinutes(ticks: number) {
         return this.pad((Math.floor(ticks / 60)) % 60);
    }

    private getHours(ticks: number) {
        return this.pad(Math.floor((ticks / 60) / 60));
    }

    private pad(digit: any) { 
        return digit <= 9 ? '0' + digit : digit;
    }
}