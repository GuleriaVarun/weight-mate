import { Component, OnInit } from '@angular/core';
import { TabActionService } from 'src/app/services/tab-action.service';

@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.scss']
})
export class ProgressTrackerComponent implements OnInit {

  constructor(public tabActionService: TabActionService) { }

  ngOnInit(): void {
  }

}
