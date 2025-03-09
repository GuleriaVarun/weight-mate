import { Component, OnInit } from "@angular/core";
import { TabActionService } from "src/app/services/tab-action.service";

@Component({
  selector: "app-dashboard-micronutrients-card",
  templateUrl: "./dashboard-micronutrients-card.component.html",
  styleUrls: ["./dashboard-micronutrients-card.component.scss"],
})
export class DashboardMicronutrientsCardComponent implements OnInit {
  waterIntake = 0;
  goal = 4000; // Daily water goal in ml
  waterIntakeVal: any = 0;

  constructor(public tabActionService: TabActionService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadComponent();
    }, 1000);

    this.tabActionService.foodAdded.subscribe(() => {
      this.loadComponent();
    });
  }

  loadComponent() {
    this.waterIntake =this.getWaterIntake();
    this.waterIntakeVal = (this.waterIntake / this.goal) * 100; 
  }

  getProteinProgress() {
    return (
      this.tabActionService.totalProtein /
      (Number(this.tabActionService.userInfo.macros?.protein?.grams) || 0)
    );
  }

  getCarbsProgress() {
    return (
      this.tabActionService.totalCarbs /
      (Number(this.tabActionService.userInfo.macros?.carbs?.grams) || 0)
    );
  }

  getFatProgress() {
    return (
      this.tabActionService.totalFat /
      (Number(this.tabActionService.userInfo.macros?.fats?.grams) || 0)
    );
  }

  getWaterIntake() {
    const foodToday = this.tabActionService.getFoodLoggedForToday();
    return foodToday?.water ? foodToday?.water : 0;
  }

  getWaterProgress() {
    return ((Number(this.waterIntake)) || 0) / this.goal;
  }

  updateDisplay() {
    const foodToday = this.tabActionService.getFoodLoggedForToday();
    foodToday.water = this.waterIntake;
    this.updateLocalStorageForWater();
    this.waterIntakeVal = (this.waterIntake / this.goal) * 100;
  }

  updateLocalStorageForWater() {
    const user = this.tabActionService.userInfo;

    user.foodLogged?.forEach((food) => {
      if (food.date === this.tabActionService.currentDate) {
        food.water = this.waterIntake;
      }
    });

    this.tabActionService.updateLocalStorage(user);
  }

  increaseWater() {
    if (this.waterIntake < this.goal) {
      this.waterIntake += 100;
      this.updateDisplay();
    }
  }

  decreaseWater() {
    if (this.waterIntake > 0) {
      this.waterIntake -= 100;
      this.updateDisplay();
    }
  }
}
