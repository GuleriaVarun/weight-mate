import { Component, Input, OnInit } from "@angular/core";
import foodList from "../../utilities/food-list.json";
import { TabActionService } from "src/app/services/tab-action.service";
import { FoodItem } from "src/app/interfaces/food.interface";

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
  currentSelectedFood: FoodItem | undefined;
  servingSizeBelow1: any[] = ["-", "1/8", "1/4", "1/3", "1/2", "2/3", "3/4"];
  servingSizes: any[] = [];
  servingSizeSelected: any = undefined;
  servingSizeBelow1Selected: any = undefined;
  southIndianFoodList = [
    "masala dosa",
    "dosa",
    "medu vada",
    "vada",
    "sambar",
    "upma",
    "idli",
    "poha",
  ];
  indianSweets = [
    "Gulab Jamun",
    "Rasgulla",
    "Jalebi",
    "Ladoo",
    "Kaju Katli",
    "Barfi",
    "Mysore Pak",
    "Peda",
    "Sandesh",
    "Gajar Ka Halwa",
    "Rasmalai",
    "Soan Papdi",
    "Balushahi",
    "Shrikhand",
    "Malpua",
    "Modak",
    "Basundi",
    "Kalakand",
    "Chum Chum",
    "Kulfi",
  ];
  foodSuggestions: any[] = this.tabActionService.getFoodSuggestions() as any[];

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

  selectServing(selectedFood: FoodItem) {
    this.isAddServingModalOpen = false;
    this.currentSelectedFood = JSON.parse(JSON.stringify(selectedFood));
    this.isAddServingModalOpen = true;
    this.servingSizes = [];

    for (let i = 0; i <= 10; i++) {
      this.servingSizes.push(i);
    }

    this.servingSizeSelected = this.servingSizes[0];
    this.servingSizeBelow1Selected = this.servingSizeBelow1[0];
  }

  updateFoodAccordingToServing(food: FoodItem) {
    if (this.servingSizeBelow1Selected === "-") {
      this.servingSizeBelow1Selected = 0;
    }

    if (
      this.servingSizeBelow1Selected === 0 &&
      this.servingSizeSelected === 0
    ) {
      return;
    }

    const totalServing =
      Number(eval(this.servingSizeBelow1Selected).toFixed(2)) +
      this.servingSizeSelected;

    food.calories = Math.floor(food.calories * totalServing);
    food.carbohydrates = Math.floor(food.carbohydrates * totalServing);
    food.fat = Math.floor(food.fat * totalServing);
    food.protein = Math.floor(food.protein * totalServing);
    food.count = this.servingSizeSelected > 0 ? this.servingSizeSelected : 1;

    return food;
  }

  addFood() {
    const originalFoodData = JSON.parse(
      JSON.stringify(this.currentSelectedFood)
    );
    this.currentSelectedFood = this.updateFoodAccordingToServing(
      this.currentSelectedFood as FoodItem
    );

    this.isAddServingModalOpen = false;
    const currentDate = this.tabActionService.currentDate;
    (this.currentSelectedFood as FoodItem).mealType = this.mealType;

    if (this.loggedInUser.foodLogged.length === 0) {
      this.loggedInUser.foodLogged.push({
        date: this.tabActionService.getDay(Date.now()),
        foodList: [this.currentSelectedFood],
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
          (food: any) => food.id === (this.currentSelectedFood as FoodItem).id
        );

        if (!foodExists) {
          getFoodForCurrentDate[0].foodList.push(this.currentSelectedFood);
        } else {
          foodExists.count =
            this.servingSizeSelected > 0
              ? foodExists.count + this.servingSizeSelected
              : foodExists.count + 1;
          const foodIndex = getFoodForCurrentDate[0].foodList.findIndex(
            (food: any) => food.id === (this.currentSelectedFood as FoodItem).id
          );

          getFoodForCurrentDate[0].foodList[foodIndex] = foodExists;
        }
      } else {
        this.loggedInUser.foodLogged.push({
          date: currentDate,
          foodList: [this.currentSelectedFood],
          water: 0,
        });
      }
    }

    this.tabActionService.calculateTotalNutrition(this.loggedInUser.foodLogged);
    this.tabActionService.updateLocalStorage(this.loggedInUser);
    this.tabActionService.setUserInfo(this.loggedInUser);
    this.tabActionService.foodAddEvent();
    this.setFoodSuggestions(originalFoodData);
    this.tabActionService.presentToast(
      "bottom",
      `${(this.currentSelectedFood as FoodItem).name} Added!`
    );
  }

  setFoodSuggestions(originalFoodData: any) {
    const getFoodSuggestions = localStorage.getItem("foodSuggestions");
    if (!getFoodSuggestions) {
      this.tabActionService.setFoodSuggestions([]);
    }

    const existingSuggestions =
      this.tabActionService.getFoodSuggestions() as any[];
    const foodExist = existingSuggestions.find(
      (food) => food.id === (this.currentSelectedFood as FoodItem).id
    );
    if (!foodExist) {
      existingSuggestions.unshift(originalFoodData);
      if (existingSuggestions.length > 12) {
        existingSuggestions.splice(-5);
      }

      this.tabActionService.setFoodSuggestions(existingSuggestions);
      this.foodSuggestions = existingSuggestions;
    }
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
