import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class TimerService {

    private play: boolean = false;
    private wait: boolean = false;
    private stop: boolean = true;
    private reset: boolean = false;
    public playWaitStopReset$ = new EventEmitter();

    public playTimer() {
        this.play = true;
        this.wait = false;
        this.stop = false;
        this.reset = false;
        this.playWaitStopReset$.emit({
            play: this.play
        });
    }

    public waitTimer() {
        this.play = false;
        this.wait = true;
        this.stop = false;
        this.reset = false;
        this.playWaitStopReset$.emit({
            wait: this.wait
        });
    }

    public stopTimer() {
        this.play = false;
        this.wait = false;
        this.stop = true;
        this.reset = false;
        this.playWaitStopReset$.emit({
            stop: this.stop
        });
    }
    public resetTimer() {
        this.play = true;
        this.wait = false;
        this.stop = false;
        this.reset = true;

        this.playWaitStopReset$.emit({
            reset: this.reset
        });
    }

}