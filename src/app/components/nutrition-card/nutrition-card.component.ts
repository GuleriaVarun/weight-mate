import { Component, Input, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { TabActionService } from 'src/app/services/tab-action.service';

@Component({
  selector: 'app-nutrition-card',
  templateUrl: './nutrition-card.component.html',
  styleUrls: ['./nutrition-card.component.scss'],
})
export class NutritionCardComponent implements AfterViewInit {
  @Input() label!: string;
  @Input() consumed!: string;
  @Input() remaining!: string;
  @Input() chartId!: string; // Unique ID for each chart
  @Input() colors!: { from: string; to: string }; // Gradient colors
  @Input() waterConsumed: number = 2; // Default 2L of water consumed
  flipped: boolean = true;

  constructor(public tabActionService: TabActionService){}

  ngAfterViewInit() {
    this.initializeChart();
    this.waterConsumed = this.tabActionService.userInfo.macros?.water || 0;
  }

  getGradient(): string {
    return `linear-gradient(135deg, ${this.colors.from}, ${this.colors.to})`;
  }

  initializeChart() {
    const canvas = document.getElementById(this.chartId) as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Example x-axis labels
            datasets: [
              {
                label: `${this.label} Intake`, // Dynamic chart label
                data: [0, 10, 5, 10, 20, 0, 60], // Example data points
                borderColor: '#000', // Line color
                backgroundColor: 'rgba(255, 255, 255, 0.3)', // Fill color
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
    if (increase) {
      this.waterConsumed += 0.5; // Add 500ml
    } else {
      if (this.waterConsumed >= 0.5) {
        this.waterConsumed -= 0.5; // Minus 500ml
      }
    }
    this.updateWaterDisplay();
    ev.stopPropagation();
  }

  // Update the water remaining
  updateWaterDisplay() {
    this.remaining = (3 - this.waterConsumed).toFixed(1) + 'L';
    this.consumed = this.waterConsumed.toFixed(1) + 'L';
  }

  isFlipped = false;

  cardFlipped() {
    this.isFlipped = !this.isFlipped;
  }
}
