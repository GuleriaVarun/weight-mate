import { Component, Input, OnInit } from '@angular/core';
import foodList from '../../utilities/food-list.json';
import { TabActionService } from 'src/app/services/tab-action.service';
import { FoodItem } from 'src/app/interfaces/food.interface';

@Component({
  selector: "app-log-food",
  templateUrl: "./log-food.component.html",
  styleUrls: ["./log-food.component.scss"],
})
export class LogFoodComponent implements OnInit {
  @Input("mealType") mealType: string = "";
  public results = [...foodList];
  showResults: boolean = false;
  loggedInUser: any;
  isAddServingModalOpen: boolean = false;
  currentSelectedFood!: any;
  servingSizeBelow1: any[] = ["1/8", "1/4", "1/3", "1/2", "2/3", "3/4"];
  servingSizes: any[] = ["-", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  servingSizeSelected: any = undefined;
  servingSizeBelow1Selected: any = undefined;
  constructor(public readonly tabActionService: TabActionService) {}

  handleServingSizeChange(ev: any) {
    this.servingSizeSelected = ev.target.value;
  }

  handleServingSizeBelowChange(ev: any) {
    this.servingSizeBelow1Selected = ev.target.value;
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();

    if (query) {
      this.showResults = true;
    } else {
      this.showResults = false;
    }
    this.results = foodList.filter(
      (d: any) => d.name.toLowerCase().indexOf(query) > -1
    );
  }

  ngOnInit(): void {
    let userInfo = JSON.parse(localStorage.getItem("userInfo") as any) || {};
    this.loggedInUser = userInfo;
  }

  addFood(selectedFood: FoodItem) {
    this.currentSelectedFood = selectedFood;
    // this.isAddServingModalOpen = true;
    const currentDate = this.tabActionService.currentDate;
    selectedFood.mealType = this.mealType;
    selectedFood.count = selectedFood.count + 1;

    if (this.loggedInUser.foodLogged.length === 0) {
      this.loggedInUser.foodLogged.push({
        date: this.tabActionService.getDay(Date.now()),
        foodList: [selectedFood],
        water: 0,
      });
    } else {
      const getFoodForCurrentDate = this.loggedInUser.foodLogged.filter(
        (food: any) => {
          return food.date === currentDate;
        }
      ) as any[];

      if (
        getFoodForCurrentDate &&
        getFoodForCurrentDate.length > 0 &&
        getFoodForCurrentDate[0]?.foodList
      ) {
        const foodExists = getFoodForCurrentDate[0].foodList.find(
          (food: any) => food.id === selectedFood.id
        );

        if (!foodExists) {
          getFoodForCurrentDate[0].foodList.push(selectedFood);
        } else {
          foodExists.count = foodExists.count + 1;
          const foodIndex = getFoodForCurrentDate[0].foodList.findIndex(
            (food: any) => food.id === selectedFood.id
          );

          getFoodForCurrentDate[0].foodList[foodIndex] = foodExists;
        }
      } else {
        this.loggedInUser.foodLogged.push({
          date: currentDate,
          foodList: [selectedFood],
          water: 0,
        });
      }
    }

    this.tabActionService.calculateTotalNutrition(this.loggedInUser.foodLogged);
    this.tabActionService.updateLocalStorage(this.loggedInUser);
    this.tabActionService.setUserInfo(this.loggedInUser);
    this.tabActionService.foodAddEvent();
  }

  cancel() {
    this.isAddServingModalOpen = false;
    this.currentSelectedFood = undefined;
  }

  getFoodListForGivenDate(date: any) {
    const getFoodForCurrentDate = this.loggedInUser.foodLogged.filter(
      (food: any) => {
        return food.date === date;
      }
    ) as any[];

    if (
      getFoodForCurrentDate &&
      getFoodForCurrentDate.length > 0 &&
      getFoodForCurrentDate[0]?.foodList.length > 0
    ) {
      return getFoodForCurrentDate[0];
    }
  }
}
