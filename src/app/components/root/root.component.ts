import { Component, OnInit, ViewChild } from '@angular/core';
import { TabActionService } from 'src/app/services/tab-action.service';
import ideasList from '../../utilities/healthy-ideas.json';
import { Chart } from 'chart.js/auto';
import { TranslateService } from '@ngx-translate/core';
import { IonNav } from '@ionic/angular';
import { AdMob } from '@capacitor-community/admob';
import { AdsService } from 'src/app/services/ads.service';
import { WeightTrackerComponent } from '../v2/dashboard-progress-card/weight-tracker/weight-tracker.component';

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
    private adsService: AdsService
  ) {
    this.tabActionService.dateChanged.subscribe(() => {
      this.insightChart.destroy();
      this.loadMealWiseData();
      this.getWaterIntake();
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

  getWaterIntake() {
    const foodToday = this.tabActionService.getFoodLoggedForToday();
    this.waterConsumed = foodToday?.water ? foodToday?.water : 0;
  }

  ngOnInit(): void {
    this.fatLabel = this.translateService.instant('fats');
    this.carbsLabel = this.translateService.instant('carbs');
    this.proteinLabel = this.translateService.instant('proteins');
    this.waterLabel = this.translateService.instant('water');
    this.getIdeaForTheDay();
    this.getStreak();
    this.getWaterIntake();

    if (this.tabActionService.userInfo.foodLogged?.length === 0) {
      setTimeout(() => {
        this.tabActionService.presentToast('top', "Let's log your first meal for today!");
      }, 8000);
    }

    AdMob.initialize();
  }

  ngAfterViewInit() {
    this.loadChartData();
    this.loadMealWiseData();
  }

  private loadChartData() {
    const labelsCal: any[] =
      this.tabActionService.userInfo.foodLogged?.map((food) => food.date) || [];

    const data: any[] = labelsCal.map(
      (label) =>
        this.tabActionService.calculateTotalNutrition(
          this.tabActionService.userInfo.foodLogged || [],
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
    const loggedFood = this.tabActionService.userInfo.foodLogged as any[];

    this.streak = this.calculateStreak(loggedFood);
  }

  calculateStreak(foodEntries: any[]): number {
    const today = new Date().toISOString().split("T")[0];
    
    // Sort entries by date
    const sortedEntries = foodEntries.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let streak = 0;
  
    for (let i = sortedEntries.length - 1; i >= 0; i--) {
      const currentDate = sortedEntries[i].date;
      const previousDate =
        i > 0 ? sortedEntries[i - 1].date : null;
  
      // Check if today is missing in the list
      if (currentDate === today) {
        streak++;
      } else if (i === sortedEntries.length - 1 && currentDate !== today) {
        // If the most recent date is not today, reset the streak
        streak = 0;
        break;
      }

      // Check for consecutive dates
      if (previousDate) {
        const diff =
          (new Date(currentDate).getTime() - new Date(previousDate).getTime()) /
          (1000 * 60 * 60 * 24); // Difference in days
        
        console.log('**** Diff : ', diff);
          if (diff === 1) {
          streak++;
        } else if (diff > 1) {
          // If there's a gap, reset the streak
          break;
        }
      }
    }
  
    return streak;
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
