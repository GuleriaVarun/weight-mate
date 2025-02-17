import { Component, OnInit } from '@angular/core';
import { DiscoverRecipiesComponent } from './discover-recipies/discover-recipies.component';
import { DiscoverWorkoutsComponent } from './discover-workouts/discover-workouts.component';

@Component({
  selector: 'app-dashboard-discover-card',
  templateUrl: './dashboard-discover-card.component.html',
  styleUrls: ['./dashboard-discover-card.component.scss']
})
export class DashboardDiscoverCardComponent implements OnInit {

  recipieComponent = DiscoverRecipiesComponent;
  workoutComponent = DiscoverWorkoutsComponent;
  constructor() { }

  ngOnInit(): void {
  }

}
