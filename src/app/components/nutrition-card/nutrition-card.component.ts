import { Component, Input, AfterViewInit } from "@angular/core";
import { Chart } from "chart.js/auto";
import { TabActionService } from "src/app/services/tab-action.service";

@Component({
  selector: "app-nutrition-card",
  templateUrl: "./nutrition-card.component.html",
  styleUrls: ["./nutrition-card.component.scss"],
})
export class NutritionCardComponent implements AfterViewInit {
  @Input() label!: string;
  @Input() consumed!: string;
  @Input() remaining!: string;
  @Input() chartId!: string; // Unique ID for each chart
  @Input() colors!: { from: string; to: string }; // Gradient colors
  @Input() waterConsumed: any = 0; // Default 2L of water consumed
  flipped: boolean = true;
  loggedInUser: any;

  constructor(public tabActionService: TabActionService) {
    this.tabActionService.dateChanged.subscribe(() => {
      this.updateWaterCard();
    });
  }

  ngOnInit() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo") as any) || {};
    this.loggedInUser = userInfo;
    this.updateWaterCard();
  }

  updateWaterCard() {
    const foodToday = this.tabActionService.getFoodLoggedForToday();
    this.waterConsumed = foodToday?.water ? foodToday?.water : 0;
  }

  ngAfterViewInit() {
    this.initializeChart();
  }

  getGradient(): string {
    return `linear-gradient(135deg, ${this.colors.from}, ${this.colors.to})`;
  }

  initializeChart() {
    const canvas = document.getElementById(this.chartId) as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // Example x-axis labels
            datasets: [
              {
                label: `${this.label} Intake`, // Dynamic chart label
                data: [0, 10, 5, 10, 20, 0, 60], // Example data points
                borderColor: "#000", // Line color
                backgroundColor: "rgba(255, 255, 255, 0.3)", // Fill color
                borderWidth: 2,
                tension: 0.4, // Curved lines
                pointRadius: 3,
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
              x: { display: false }, // Hide x-axis
              y: { display: false }, // Hide y-axis
            },
          },
        });
      } else {
        console.error(`Failed to get context for canvas ID: ${this.chartId}`);
      }
    } else {
      console.error(`Canvas element with ID '${this.chartId}' not found`);
    }
  }

  // Update the water intake
  adjustWater(ev: Event, increase: boolean) {
    let splitWaterVal = typeof(this.waterConsumed) === "string" && this.waterConsumed.indexOf('L') !== -1 ? Number(this.waterConsumed.split('L')[0]) : this.waterConsumed;
    console.log('water : ', this.waterConsumed, '.....', splitWaterVal);
    if (increase) {
      splitWaterVal += 0.5; // Add 500ml
      this.tabActionService.presentToast("top", "Logged 500ml water !");
    } else {
      if (splitWaterVal >= 0.5) {
        splitWaterVal -= 0.5; // Minus 500ml
        this.tabActionService.presentToast(
          "top",
          "Reduced water intake by 500ml!"
        );
      }
    }
    this.waterConsumed = splitWaterVal;
    console.log('water 2: ', this.waterConsumed, '.....', splitWaterVal);

    this.updateWaterDisplay();
    ev.stopPropagation();
  }

  // Update the water remaining
  updateWaterDisplay() {
    this.remaining = (3 - this.waterConsumed).toFixed(1) + "L";
    this.consumed = this.waterConsumed.toFixed(1) + "L";

    if (this.consumed === "4.0L") {
      this.tabActionService.showBannerPopup(
        "Great job! You have completed your water intake for today—keep it up and stay hydrated!"
      );
    }

    this.updateWaterForUser();
  }

  updateWaterForUser() {
    const currentDate = this.tabActionService.currentDate;

    const foodIndex = this.loggedInUser.foodLogged.findIndex((food: any) => {
      return food.date === currentDate;
    });

    if (foodIndex !== -1) {
      this.loggedInUser.foodLogged[foodIndex].water = this.consumed;
      this.tabActionService.updateLocalStorage(this.loggedInUser);
    }
  }

  getFoodIndexForCurrentDate() {
    const currentDate = this.tabActionService.currentDate;

    const foodIndex = this.loggedInUser.foodLogged.findIndex((food: any) => {
      return food.date === currentDate;
    });

    return foodIndex;
  }

  isFlipped = false;

  cardFlipped() {
    this.isFlipped = !this.isFlipped;
  }
}
