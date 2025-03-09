import { Component, OnInit } from '@angular/core';
import { TabActionService } from 'src/app/services/tab-action.service';

@Component({
  selector: 'app-dashboard-micronutrients-card',
  templateUrl: './dashboard-micronutrients-card.component.html',
  styleUrls: ['./dashboard-micronutrients-card.component.scss']
})
export class DashboardMicronutrientsCardComponent implements OnInit {

  constructor(public tabActionService: TabActionService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadComponent();
    }, 1000);

    this.tabActionService.foodAdded.subscribe(() => {
      this.loadComponent();
    });
  }

  loadComponent() {
    this.getWaterIntake();
  }

  getProteinProgress() {
    return this.tabActionService.totalProtein / (Number(this.tabActionService.userInfo.macros?.protein?.grams) || 0);
  }

  getCarbsProgress() {
    return this.tabActionService.totalCarbs / (Number(this.tabActionService.userInfo.macros?.carbs?.grams) || 0);
  }

  getFatProgress() {
    return this.tabActionService.totalFat / (Number(this.tabActionService.userInfo.macros?.fats?.grams) || 0);
  }

  getWaterIntake() {
    const foodToday = this.tabActionService.getFoodLoggedForToday();
    return foodToday?.water ? foodToday?.water : 0;
  }

}
