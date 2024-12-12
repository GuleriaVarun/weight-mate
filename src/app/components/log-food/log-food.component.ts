import { Component, Input, OnInit } from '@angular/core';
import foodList from '../../utilities/food-list.json';
import { TabActionService } from 'src/app/services/tab-action.service';
import { FoodItem } from 'src/app/interfaces/food.interface';

@Component({
  selector: 'app-log-food',
  templateUrl: './log-food.component.html',
  styleUrls: ['./log-food.component.scss'],
})
export class LogFoodComponent implements OnInit {
  @Input('mealType') mealType: string = '';
  public results = [...foodList];
  showResults: boolean = false;
  loggedInUser: any;

  constructor(public readonly tabActionService: TabActionService) {}

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
    let userInfo = JSON.parse(localStorage.getItem('userInfo') as any) || {};
    this.loggedInUser = userInfo;
  }

  addFood(selectedFood: FoodItem) {
    const currentDate = this.tabActionService.currentDate;
    selectedFood.mealType = this.mealType;
    selectedFood.count = selectedFood.count + 1;

    if (this.loggedInUser.foodLogged.length === 0) {
      this.loggedInUser.foodLogged.push({
        date: this.tabActionService.getDay(Date.now()),
        foodList: [selectedFood],
        water: 0
      });
    } else {
      const getFoodForCurrentDate = this.loggedInUser.foodLogged.filter(
        (food: any) => {
          return food.date === currentDate;
        }
      ) as any[];

      if (
        getFoodForCurrentDate && getFoodForCurrentDate.length > 0 &&
        getFoodForCurrentDate[0]?.foodList.length > 0
      ) {
        const foodExists = getFoodForCurrentDate[0].foodList.find(
          (food: any) => food.id === selectedFood.id
        );

        if (!foodExists) {
          getFoodForCurrentDate[0].foodList.push(selectedFood);
        }

      } else {
        this.loggedInUser.foodLogged.push({
          date: currentDate,
          foodList: [selectedFood],
          water: 0
        });
      }
    }

    this.tabActionService.calculateTotalNutrition(this.loggedInUser.foodLogged);
    this.tabActionService.updateLocalStorage(this.loggedInUser);
    this.tabActionService.setUserInfo(this.loggedInUser);
    this.tabActionService.foodAddEvent();
  }

  getFoodListForGivenDate(date: any) {
    const getFoodForCurrentDate = this.loggedInUser.foodLogged.filter(
      (food: any) => {
        return food.date === date;
      }
    ) as any[];

    if (
      getFoodForCurrentDate && getFoodForCurrentDate.length > 0 &&
      getFoodForCurrentDate[0]?.foodList.length > 0
    ) {

      return getFoodForCurrentDate[0];
    }
  }
}
