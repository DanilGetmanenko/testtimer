import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimerService } from './timer.service';

@Component({
    selector: 'buttons',
    template: `
        <div>
            <button [disabled]="play" (click)="playTimer()">Play</button>
            <button (click)="waitTimer()">Wait</button>
            <button (click)="stopTimer()">Stop</button>
            <button (click)="resetTimer()">Reset</button>
        </div>
    `,
    styles: [`
        div {
            text-align: center;
        }
    `]
})
export class ButtonsComponent implements OnInit, OnDestroy {

    private playWaitStopResetUnsubscribe: any;
    private play: boolean;


    constructor(private timerService: TimerService) {
    }

    ngOnInit() {
        this.playWaitStopResetUnsubscribe = this.timerService.playWaitStopReset$.subscribe((res: any) => this.setPlay(res));       
    }

    ngOnDestroy() {
        this.playWaitStopResetUnsubscribe.unsubscribe();
    }

    private setPlay(res: any) {
        (res.play) ? this.play = true : this.play = false;  
    }

    playTimer() {
        this.timerService.playTimer();
    }

    waitTimer() {
        this.timerService.waitTimer();
    }

    stopTimer() {
        this.timerService.stopTimer();
    }

    resetTimer() {
        this.timerService.resetTimer();
    }

}