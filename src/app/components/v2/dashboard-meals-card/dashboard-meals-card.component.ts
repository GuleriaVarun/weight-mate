import { Component, OnInit } from '@angular/core';
import { TabActionService } from 'src/app/services/tab-action.service';
import { LogFoodComponent } from '../../log-food/log-food.component';
import { UpdateMealComponent } from './update-meal/update-meal.component';

@Component({
  selector: 'app-dashboard-meals-card',
  templateUrl: './dashboard-meals-card.component.html',
  styleUrls: ['./dashboard-meals-card.component.scss']
})
export class DashboardMealsCardComponent implements OnInit {
  updateLoggedFood:any[] = [];
  logFoodComponent = LogFoodComponent;
  updateMealComponent = UpdateMealComponent;
  
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
    const getFoodForCurrentDate =
      this.tabActionService.userInfo.foodLogged?.find((food) => {
        return food.date === this.tabActionService.currentDate;
      });

      console.log('Food list : ', this.updateLoggedFood);
    if (getFoodForCurrentDate) {
      this.updateLoggedFood = getFoodForCurrentDate.foodList;
    }
  }

  getWaterIntake() {
    const foodToday = this.tabActionService.getFoodLoggedForToday();
    return foodToday?.water ? foodToday?.water : 0;
  }

  getBreakFastList() {
    return this.updateLoggedFood.filter(
      (food) => food.mealType === "breakfast"
    );
  }

  getBreakFastTotalCalories() {
    return this.getBreakFastList().reduce(
      (acc, i) => i.calories * i.count + acc,
      0
    );
  }

  selectFoodCategory(category: string) {
    sessionStorage.setItem('foodCategory', category);
  }

  getLunchList() {
    return this.updateLoggedFood.filter((food) => food.mealType === "lunch");
  }

  getLunchTotalCalories() {
    return this.getLunchList().reduce(
      (acc, i) => i.calories * i.count + acc,
      0
    );
  }

  getSnacksList() {
    return this.updateLoggedFood.filter((food) => food.mealType === "snacks");
  }

  getSnacksTotalCalories() {
    return this.getSnacksList().reduce(
      (acc, i) => i.calories * i.count + acc,
      0
    );
  }

  getDinnerList() {
    return this.updateLoggedFood.filter((food) => food.mealType === "dinner");
  }

  getDinnerTotalCalories() {
    return this.getDinnerList().reduce(
      (acc, i) => i.calories * i.count + acc,
      0
    );
  }

}
