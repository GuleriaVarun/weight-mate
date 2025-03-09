import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discover-workouts',
  templateUrl: './discover-workouts.component.html',
  styleUrls: ['./discover-workouts.component.scss']
})
export class DiscoverWorkoutsComponent implements OnInit {
  workouts = [
    {
      title: "Day 1",
      subtitle: "Full Body Strength Training",
      description: "A full-body strength training session focusing on major muscle groups. Perform squats, push-ups, and glute bridges to build muscle and burn fat. Use moderate to heavy weights and aim for 3-4 sets of 8-12 reps per exercise. Ensure proper rest between sets to maximize strength gains.",
      calories: "350-500 kcal",
      time: "45-60 min",
      emoji: "🏋️‍♂️"
    },
    {
      title: "Day 2",
      subtitle: "Cardio + Core",
      description: "Kickstart your cardiovascular system with a 20-30 minute cardio session such as running, cycling, or jumping rope. Follow it with core exercises like crunches, leg raises, and planks to strengthen abdominal muscles. Focus on high-intensity intervals for maximum fat burn.",
      calories: "400-550 kcal",
      time: "40-50 min",
      emoji: "🏃‍♂️"
    },
    {
      title: "Day 3",
      subtitle: "Lower Body Focus",
      description: "Target your legs and glutes with a combination of squats, lunges, and glute bridges. This workout improves lower body strength and endurance. Incorporate resistance bands or weights to add intensity. End with calf raises and hamstring curls for muscle definition.",
      calories: "300-450 kcal",
      time: "50-60 min",
      emoji: "🦵"
    },
    {
      title: "Day 4",
      subtitle: "Cardio + Upper Body",
      description: "Start with 20-30 minutes of high-intensity cardio (HIIT, jump rope, or sprinting). Follow with an upper-body workout, including push-ups, pull-ups, and dumbbell exercises like shoulder presses and bicep curls. Maintain proper form to prevent injuries.",
      calories: "450-600 kcal",
      time: "45-60 min",
      emoji: "💪🏽"
    },
    {
      title: "Day 5",
      subtitle: "Active Recovery / Yoga",
      description: "A low-intensity day to promote recovery. Engage in yoga, stretching, or a light walk to improve flexibility and reduce muscle soreness. Focus on deep breathing and mobility exercises to enhance relaxation and mental well-being.",
      calories: "200-300 kcal",
      time: "30-45 min",
      emoji: "🧘‍♂️"
    },
    {
      title: "Day 6",
      subtitle: "Total Body Circuit",
      description: "Perform a high-energy circuit workout that includes jump squats, burpees, mountain climbers, and push-ups. This routine boosts endurance, strength, and fat burn. Do each exercise for 45 seconds with minimal rest in between rounds.",
      calories: "500-700 kcal",
      time: "40-50 min",
      emoji: "🔄"
    },
    {
      title: "Day 7",
      subtitle: "Cardio + Flexibility",
      description: "Wrap up the week with a moderate cardio session (brisk walking, jogging, or cycling) followed by full-body stretching. Focus on improving flexibility and mobility to aid muscle recovery and prevent stiffness.",
      calories: "250-400 kcal",
      time: "40-50 min",
      emoji: "🚶‍♂️"
    }
  ];
   
  
  constructor() { }

  ngOnInit(): void {
  }

  showDetails: boolean = false;
  selectedWorkout: any = "";
  openDetails(workout: any) {
    this.showDetails = false;
    this.showDetails = true;
    this.selectedWorkout = workout;
  }

  goBack() {
    this.showDetails = false;
    this.selectedWorkout = undefined;
  }

}
