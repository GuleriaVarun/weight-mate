import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js/auto";
import { WeightRecord } from "src/app/interfaces/userInfo.interface";
import { TabActionService } from "src/app/services/tab-action.service";

@Component({
  selector: "app-weight-tracker",
  templateUrl: "./weight-tracker.component.html",
  styleUrls: ["./weight-tracker.component.scss"],
})
export class WeightTrackerComponent implements OnInit {
  newWeight: any = undefined;

  constructor(private tabService: TabActionService) {}

  ngOnInit(): void {
    this.loadWeightChart();
  }

  loadWeightChart() {
    const dateArr = this.tabService.userInfo.recordedWeight?.map(
      (res) => res.date
    );
    const weightArr = this.tabService.userInfo.recordedWeight?.map(
      (res) => res.weight
    );
    this.initializeMealWiseChart(dateArr, weightArr);
  }

  weightChart: any;
  initializeMealWiseChart(data2: any[] = [], weightArr: any[] = []) {
    const canvas1 = document.getElementById(
      "weightTracker"
    ) as HTMLCanvasElement;
    if (canvas1) {
      const ctx = canvas1.getContext("2d");
      if (ctx) {
        this.weightChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: data2,
            datasets: [
              {
                label: `Calories Intake`,
                data: weightArr,
                borderColor: "#fff",
                backgroundColor: ["#89CFF0", "#7DF9FF", "#A3B4A2", "#DC143C"],
                borderWidth: 2,
                tension: 0.1,
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
                display: true,
              },
            },
          },
        });
      } else {
      }
    } else {
    }
  }

  showAddWeight: boolean = false;
  showWeight() {
    this.showAddWeight = true;
  }

  addWeight() {
    this.weightChart.destroy();

    const dateExistIndex = (
      this.tabService.userInfo.recordedWeight as WeightRecord[]
    )?.findIndex((res) => res.date === this.tabService.currentDate);

    if (dateExistIndex !== -1) {
      (this.tabService.userInfo.recordedWeight as WeightRecord[])[
        dateExistIndex
      ].weight = this.newWeight;
    } else {
      this.tabService.userInfo.recordedWeight?.push({
        date: this.tabService.currentDate,
        weight: this.newWeight,
      });
    }

    this.tabService.userInfo.weight = this.newWeight;
    this.tabService.updateLocalStorage(this.tabService.userInfo);
    this.loadWeightChart();
    this.newWeight = undefined;
    this.tabService.presentToast('bottom', "New weight recorded successfully!");
  }
}
