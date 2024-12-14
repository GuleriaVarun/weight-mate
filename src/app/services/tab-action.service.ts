import { Injectable } from '@angular/core';
import { UserInfo } from '../interfaces/userInfo.interface';
import { Subject } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class TabActionService {
  showSelectFoodScreen: boolean = false;
  showMainViewScreen: boolean = true;

  maintainWeight: number = 0;
  // Nutrition info
  totalCalories: number = 0;
  totalProtein: number = 0;
  totalCarbs: number = 0;
  totalFat: number = 0;
  totalWater: number = 0;

  // User Details
  userInfo!: UserInfo;
  currentDate: string = '';

  dateChanged: Subject<string> = new Subject<string>();
  foodAdded: Subject<string> = new Subject<string>();

  showBannerMessage: boolean = false;
  bannerMessage: string = '';

  constructor(private toastController: ToastController) {}

  showBannerPopup(message: string) {
    this.showBannerMessage = true;
    this.bannerMessage = message;
    
    setTimeout(() => {
      this.showBannerMessage = false;
    }, 5000);
  }

  toggleSelectFoodScreen() {
    this.showSelectFoodScreen = true;
    this.showMainViewScreen = false;
  }

  toggleMainViewScreen() {
    this.showSelectFoodScreen = false;
    this.showMainViewScreen = true;
  }

  calculateTotalNutrition(foodLogged: any[] | [], date?: any) {
    if (!date) {
      date = this.currentDate;
    }
    const foodList = foodLogged
      .filter((food: any) => food.date === date)
      .map((food: any) => food.foodList)
      .flat() as any[];

    const totalNutrition = foodList.reduce(
      (acc: any, food: any) => {
        acc.calories += food.calories * food.count;
        acc.carbs += food.carbohydrates * food.count;
        acc.protein += food.protein * food.count;
        acc.fat += food.fat * food.count;
        return acc;
      },
      { calories: 0, carbs: 0, protein: 0, fat: 0 }
    );

    this.totalCalories = totalNutrition.calories;
    this.totalCarbs = totalNutrition.carbs;
    this.totalProtein = totalNutrition.protein;
    this.totalFat = totalNutrition.fat;

    console.log('Total Nutirition : ', totalNutrition);
    return totalNutrition;
  }

  setUserInfo(userInfo: any) {
    this.userInfo = userInfo;
  }

  setCurrentDate(date: any) {
    this.currentDate = this.getDay(date);
  }

  getDay(date: number) {
    return new Intl.DateTimeFormat('en-CA').format(date);
  }

  reloadHomePageForCurrentDate() {
    this.calculateTotalNutrition(this.userInfo.foodLogged as any);
    this.getRemainingCalories();
  }

  getRemainingCalories() {
    if (this.totalCalories > this.maintainWeight) {
      return '0';
    }
    return Math.trunc(this.maintainWeight - this.totalCalories);
  }

  dateChangedEvent() {
    this.dateChanged.next(this.currentDate);
  }

  foodAddEvent() {
    this.foodAdded.next(this.currentDate);
  }

  updateLocalStorage(user: any) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  async presentToast(position: 'top' | 'bottom' | 'middle', message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5500,
      position,
    });

    await toast.present();
  }
}
