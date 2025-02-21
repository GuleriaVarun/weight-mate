import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ProgressTrackerComponent } from "../../progress-tracker/progress-tracker.component";
import { TabActionService } from "src/app/services/tab-action.service";
import { Chart } from 'chart.js/auto';

@Component({
  selector: "app-dashboard-progress-card",
  templateUrl: "./dashboard-progress-card.component.html",
  styleUrls: ["./dashboard-progress-card.component.scss"],
})
export class DashboardProgressCardComponent implements OnInit, AfterViewInit {
  progressTrackComponent = ProgressTrackerComponent;
  streak: number = 0;

  constructor(public tabActionService: TabActionService) {
    this.tabActionService.dateChanged.subscribe(() => {
      this.insightChart.destroy();
      this.loadMealWiseData();
    });

    this.tabActionService.foodAdded.subscribe(() => {
      this.insightChart.destroy();
      this.loadMealWiseData();
    });
  }

  ngAfterViewInit() {
    this.loadMealWiseData();
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

  insightChart: any;
  initializeMealWiseChart(data2: any[] = []) {
    const canvas1 = document.getElementById("insight") as HTMLCanvasElement;
    if (canvas1) {
      const ctx = canvas1.getContext("2d");
      if (ctx) {
        this.insightChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Breakfast", "Lunch", "Snacks", "Dinner"],
            datasets: [
              {
                label: `Calories Intake`,
                data: data2,
                borderColor: "#fff",
                backgroundColor: ["#89CFF0", "#7DF9FF", "#FFB6C1", "#FF7F7F"],
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
                    weight: "bold",
                  },
                },
                display: true,
              },
              y: {
                ticks: {
                  font: {
                    size: 12,
                    weight: "bold",
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

  ngOnInit(): void {
    this.getStreak();
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
      const previousDate = i > 0 ? sortedEntries[i - 1].date : null;

      if (currentDate === today) {
        streak++;
      } else if (i === sortedEntries.length - 1 && currentDate !== today) {
        streak = 0;
        break;
      }

      // Check for consecutive dates
      if (previousDate) {
        const diff =
          (new Date(currentDate).getTime() - new Date(previousDate).getTime()) /
          (1000 * 60 * 60 * 24); // Difference in days

        if (diff === 1) {
          streak++;
        } else if (diff > 1) {
          break;
        }
      }
    }

    return streak;
  }
}
