import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { enableProdMode } from '@angular/core';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { ButtonsComponent } from './timer/timer.button.component';
import { TimerService } from './timer/timer.service';
 


@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    ButtonsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
{
  enableProdMode();
}