import { Component, OnInit } from '@angular/core';
import { TabActionService } from 'src/app/services/tab-action.service';

@Component({
  selector: 'app-dashboard-calories-card',
  templateUrl: './dashboard-calories-card.component.html',
  styleUrls: ['./dashboard-calories-card.component.scss']
})
export class DashboardCaloriesCardComponent implements OnInit {

  constructor(public tabActionService: TabActionService) { }

  ngOnInit(): void {
  }

}
