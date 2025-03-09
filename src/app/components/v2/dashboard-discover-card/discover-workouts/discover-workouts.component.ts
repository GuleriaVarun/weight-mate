import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discover-workouts',
  templateUrl: './discover-workouts.component.html',
  styleUrls: ['./discover-workouts.component.scss']
})
export class DiscoverWorkoutsComponent implements OnInit {

  workouts = [
    {
      title: "Day 1: Full Body Strength Training",
      description: "Focus on squats, push-ups, and glute bridges to build muscle and burn fat.",
      background: "linear-gradient(171deg, rgba(255,87,34,1) 0%, rgba(255,255,255,1) 100%)",
    },
    {
      title: "Day 2: Cardio + Core",
      description: "Go for a 20–30 minute cardio session followed by core exercises like crunches and leg raises.",
      background: "linear-gradient(171deg, rgba(33,150,243,1) 0%, rgba(255,255,255,1) 100%)",
    },
    {
      title: "Day 3: Lower Body Focus",
      description: "Target your legs with squats, lunges, and glute bridges to strengthen and tone.",
      background: "linear-gradient(171deg, rgba(76,175,80,1) 0%, rgba(255,255,255,1) 100%)",
    },
    {
      title: "Day 4: Cardio + Upper Body",
      description: "Do 20–30 minutes of HIIT cardio followed by push-ups and dumbbell exercises for your upper body.",
      background: "linear-gradient(171deg, rgba(255,193,7,1) 0%, rgba(255,255,255,1) 100%)",
    },
    {
      title: "Day 5: Active Recovery / Yoga",
      description: "Engage in yoga or a light walk to improve flexibility and promote recovery.",
      background: "linear-gradient(171deg, rgba(103,58,183,1) 0%, rgba(255,255,255,1) 100%)",
    },
    {
      title: "Day 6: Total Body Circuit",
      description: "Perform a full-body circuit with jump squats, burpees, and mountain climbers.",
      background: "linear-gradient(171deg, rgba(0,150,136,1) 0%, rgba(255,255,255,1) 100%)",
    },
    {
      title: "Day 7: Cardio + Flexibility",
      description: "Finish the week with a moderate cardio session and focus on full-body stretches.",
      background: "linear-gradient(171deg, rgba(244,67,54,1) 0%, rgba(255,255,255,1) 100%)",
    },
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
