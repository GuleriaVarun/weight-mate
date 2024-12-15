import { Component, OnInit, ViewChild } from '@angular/core';
import { TabActionService } from 'src/app/services/tab-action.service';
import ideasList from '../../utilities/healthy-ideas.json';
import { Chart } from 'chart.js/auto';
import { TranslateService } from '@ngx-translate/core';
import {
  AdMob,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
} from '@capacitor-community/admob';
import { IonNav } from '@ionic/angular';
import { WeightTrackerComponent } from '../weight-tracker/weight-tracker.component';

const options: BannerAdOptions = {
  adId: 'ca-app-pub-6458339069545467/6448045816',
  adSize: BannerAdSize.BANNER,
  position: BannerAdPosition.BOTTOM_CENTER,
  margin: 80,
};

@Component({
  selector: 'app-root-content',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  @ViewChild('nav') private nav!: IonNav;
  progress = 50;
  isModalOpen: boolean = false;
  isAccountModalOpen: boolean = false;
  isGoalModalOpen: boolean = false;
  waterConsumed: number = 0;
  cardName: string = '';
  ideaOfTheDay: string = '';
  streak: number = 0;
  fatLabel!: string;
  carbsLabel!: string;
  proteinLabel!: string;
  waterLabel!: string;
  
  constructor(
    public readonly tabActionService: TabActionService,
    private translateService: TranslateService,
  ) {
    this.tabActionService.dateChanged.subscribe(() => {
      this.insightChart.destroy();
      this.loadMealWiseData();
    });

    this.tabActionService.foodAdded.subscribe(() => {
      this.insightChart.destroy();
      this.loadMealWiseData();
      this.progressChart.destroy();
      this.loadChartData();
      this.getStreak();
      this.tabActionService.reloadHomePageForCurrentDate();
    });
  }

  ngOnInit(): void {
    this.fatLabel = this.translateService.instant('fats');
    this.carbsLabel = this.translateService.instant('carbs');
    this.proteinLabel = this.translateService.instant('proteins');
    this.waterLabel = this.translateService.instant('water');
    this.getIdeaForTheDay();
    this.getStreak();

    if (this.tabActionService.userInfo.foodLogged?.length === 0) {
      setTimeout(() => {
        this.tabActionService.presentToast('top', "Let's log your first meal for today!");
      }, 8000);
    }

    AdMob.initialize();
  }

  private initAdMob() {
    AdMob.showBanner(options);
  }

  private hideAdMob() {
    AdMob.hideBanner();
  }

  ngAfterViewInit() {
    this.loadChartData();
    this.loadMealWiseData();

    setTimeout(() => {
      setInterval(() => {
        this.initAdMob();
        setTimeout(() => {
          this.hideAdMob();
        }, 10000);
      }, 60000);
    }, 25000);
  }

  private loadChartData() {
    const labelsCal: any[] =
      this.tabActionService.userInfo.foodLogged?.map((food) => food.date) || [];

    const data: any[] = labelsCal.map(
      (label) =>
        this.tabActionService.calculateTotalNutrition(
          this.tabActionService.userInfo?.foodLogged || [],
          label
        ).calories
    );

    const labels: any[] =
      this.tabActionService.userInfo.foodLogged?.map((food) =>
        this.formatDate(food.date)
      ) || [];

    this.initializeChart(labels, data);
  }

  loadMealWiseData() {
    const data2 = this.getMealWiseCaloriesCount();
    this.initializeMealWiseChart(data2);
  }

  private getMealWiseCaloriesCount() {
    const currentDate = this.tabActionService.currentDate;
    const foodList =
      this.tabActionService.userInfo.foodLogged
        ?.filter((food) => food.date === currentDate)
        .map((food) => food.foodList) || [];

    if (foodList.length === 0) {
      return [0, 0, 0, 0];
    }

    const breakfastData = (foodList[0] as any[]).reduce((acc, food) => {
      if (food.mealType === 'breakfast') {
        acc += food.calories;
      }
      return acc;
    }, 0);

    const lunchData = (foodList[0] as any[]).reduce((acc, food) => {
      if (food.mealType && food.mealType.toLowerCase() === 'lunch') {
        acc += food.calories;
      }
      return acc;
    }, 0);

    const snacksData = (foodList[0] as any[]).reduce((acc, food) => {
      if (food.mealType && food.mealType.toLowerCase() === 'snacks') {
        acc += food.calories;
      }
      return acc;
    }, 0);

    const dinnerData = (foodList[0] as any[]).reduce((acc, food) => {
      if (food.mealType && food.mealType.toLowerCase() === 'dinner') {
        acc += food.calories;
      }
      return acc;
    }, 0);

    const data2 = [breakfastData, lunchData, snacksData, dinnerData];

    return data2;
  }

  progressChart: any;

  initializeChart(labels: any[], data: any[]) {
    const canvas = document.getElementById('progress') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.progressChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: `Calories Intake`,
                data,
                borderColor: '#20bdce',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderWidth: 2,
                tension: 0.1,
                pointRadius: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
            },
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 12,
                    weight: 'bold',
                  },
                },
                display: true,
              },
              y: {
                ticks: {
                  font: {
                    size: 12,
                    weight: 'bold',
                  },
                },
              },
            },
          },
        });
      } else {
      }
    } else {
    }
  }

  insightChart: any;
  initializeMealWiseChart(data2: any[] = []) {
    const canvas1 = document.getElementById('insight') as HTMLCanvasElement;
    if (canvas1) {
      const ctx = canvas1.getContext('2d');
      if (ctx) {
        this.insightChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Breakfast', 'Lunch', 'Snacks', 'Dinner'],
            datasets: [
              {
                label: `Calories Intake`,
                data: data2,
                borderColor: '#fff',
                backgroundColor: ['#89CFF0', '#7DF9FF', '#A3B4A2', '#DC143C'],
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
            },
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 12,
                    weight: 'bold',
                  },
                },
                display: true,
              },
              y: {
                ticks: {
                  font: {
                    size: 12,
                    weight: 'bold',
                  },
                },
              },
            },
          },
        });
      } else {
      }
    } else {
    }
  }

  openCard(title: string) {
    this.isModalOpen = true;
    this.cardName = title;
  }

  setOpen() {
    this.isModalOpen = false;
  }
  onWillDismiss(event: Event) {
    this.isModalOpen = false;
  }

  getIdeaForTheDay() {
    const ideas = ideasList.ideas;
    const randomIndex = Math.floor(Math.random() * ideas.length);
    this.ideaOfTheDay = ideas[randomIndex];
  }

  getStreak() {
    this.streak = this.tabActionService.userInfo.foodLogged?.length || 0;
  }

  formatDate(dateString: string) {
    const date = new Date(dateString);
    const options = { month: 'short' as 'short', day: 'numeric' as 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
  }

  onRecordWeightWillPresent() {
    this.nav.setRoot(WeightTrackerComponent);
  }
}
