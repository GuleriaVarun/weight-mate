import { Component, OnInit } from "@angular/core";
import { FoodItem } from "src/app/interfaces/food.interface";
import { TabActionService } from "src/app/services/tab-action.service";

@Component({
  selector: "app-update-meal",
  templateUrl: "./update-meal.component.html",
  styleUrls: ["./update-meal.component.scss"],
})
export class UpdateMealComponent implements OnInit {
  updateLoggedFood: any[] = [];

  constructor(public tabActionService: TabActionService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadComponent();
    }, 1000);

    this.tabActionService.foodAdded.subscribe(() => {
      this.loadComponent();
    });
  }

  deleteFood(food: any, ev: any) {
    const getFoodForCurrentDate =
      this.tabActionService.userInfo.foodLogged?.find((food) => {
        return food.date === this.tabActionService.currentDate;
      });

    if (getFoodForCurrentDate) {
      const foodSelected = getFoodForCurrentDate.foodList.find(
        (f: any) => f.id === food.id
      );

      if (foodSelected && foodSelected.count > 1) {
        foodSelected.count = foodSelected.count - 1;
      } else if (foodSelected && food.count === 1) {
        const index = getFoodForCurrentDate.foodList.findIndex(
          (f: any) => f.id === food.id
        );
        getFoodForCurrentDate.foodList.splice(index, 1);

        this.updateLoggedFood = this.updateLoggedFood.filter(
          (f) => f.id !== food.id
        );
      }
    }

    this.tabActionService.presentToast(
      "bottom",
      `${(food as FoodItem).name} Delete!`
    );
    this.tabActionService.updateLocalStorage(this.tabActionService.userInfo);
    this.tabActionService.reloadHomePageForCurrentDate();
    this.tabActionService.foodAddEvent();
    ev.stopPropagation();
  }

  loadComponent() {
    const getFoodForCurrentDate =
      this.tabActionService.userInfo.foodLogged?.find((food) => {
        return food.date === this.tabActionService.currentDate;
      });

    console.log("Food list : ", this.updateLoggedFood);
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
    sessionStorage.setItem("foodCategory", category);
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
