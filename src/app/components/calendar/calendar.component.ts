import { Component, OnInit } from '@angular/core';
import { TabActionService } from 'src/app/services/tab-action.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  date: string = '';
  year: string = '';
  currentDate: Date = new Date();

  constructor(public readonly tabActionService: TabActionService) {
  }

  ngOnInit(): void {
    // Initialize display with today’s date
    this.updateDateDisplay();
    this.tabActionService.reloadHomePageForCurrentDate();  
  }

  updateDateDisplay(): void {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    };
    this.date = this.currentDate.toLocaleDateString(undefined, options);
    this.year = this.currentDate.getFullYear().toString();

    this.tabActionService.setCurrentDate(this.currentDate);
  }

  changeDate(days: number): void {
    this.currentDate.setDate(this.currentDate.getDate() + days);
    this.updateDateDisplay();
    this.tabActionService.reloadHomePageForCurrentDate();  
    this.tabActionService.dateChangedEvent();
  }
}
