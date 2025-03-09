import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-discover-recipies",
  templateUrl: "./discover-recipies.component.html",
  styleUrls: ["./discover-recipies.component.scss"],
})
export class DiscoverRecipiesComponent implements OnInit {
  constructor() {
  }
  recipiesList: any[] = [
    {
      name: "Masala Omelette",
      subtitle: "Spicy Indian Omelette",
      emoji: "🍳",
      description: "Whip up this delicious masala omelette recipe with Indian spices",
      background: "linear-gradient(171deg, rgba(0,156,255,1) 0%, rgba(255,255,255,1) 100%)",
      url: "https://www.youtube.com/embed/ikKcdobZvCw?list=PLZ1eGoTTiYT4glwkHHa7zGh4Ir2Pjr3Pm",
    },
    {
      name: "Kadhai Paneer",
      subtitle: "Rich & Spicy Paneer",
      emoji: "🧀",
      description: "Craving for a rich Kadhai Paneer recipe? Click to watch",
      background: "linear-gradient(171deg, rgba(186,85,211,1) 0%, rgba(255,255,255,1) 100%)",
      url: "https://www.youtube.com/embed/kVUd5IotByY?list=PLZ1eGoTTiYT4glwkHHa7zGh4Ir2Pjr3Pm",
    },
    {
      name: "Samosa",
      subtitle: "Crispy & Delicious",
      emoji: "🥟",
      description: "Samosa in Air Fryer in minutes. Checkout the recipe",
      background: "linear-gradient(171deg, rgba(0,202,44,1) 0%, rgba(255,255,255,1) 100%)",
      url: "https://www.youtube.com/embed/y-9ZowGYSwc?list=PLZ1eGoTTiYT4glwkHHa7zGh4Ir2Pjr3Pm",
    },
    {
      name: "Paneer Bhurji",
      subtitle: "Creamy & Protein-Rich",
      emoji: "🍲",
      description: "Creamy and delicious Paneer Bhurji recipe in minutes. Packed with protein.",
      background: "linear-gradient(171deg, rgba(255,105,180,1) 0%, rgba(255,255,255,1) 100%)",
      url: "https://www.youtube.com/embed/iT0jA5LaDGw?list=PLZ1eGoTTiYT4glwkHHa7zGh4Ir2Pjr3Pm&index=4",
    },
    {
      name: "Pyaaz Sabji",
      subtitle: "Simple & Quick",
      emoji: "🧅",
      description: "Easy and simple to make. Checkout this Pyaaz recipe made in minutes",
      background: "linear-gradient(171deg, rgba(255,69,58,1) 0%, rgba(255,255,255,1) 100%)",
      url: "https://www.youtube.com/embed/0a17I0qOInM?list=PLZ1eGoTTiYT4glwkHHa7zGh4Ir2Pjr3Pm&index=5",
    },
    {
      name: "Dal Makhni",
      subtitle: "Rich & Creamy Lentils",
      emoji: "🍛",
      description: "Spice up your kitchen with this delicious Dal Makhni recipe.",
      background: "linear-gradient(171deg, rgba(255,223,0,1) 0%, rgba(255,255,255,1) 100%)",
      url: "https://www.youtube.com/embed/CxE79o0CVN8?list=PLZ1eGoTTiYT4glwkHHa7zGh4Ir2Pjr3Pm&index=6",
    },
    {
      name: "Seera",
      subtitle: "Himachali Sweet Dish",
      emoji: "🍯",
      description: "A delicious Himachali sweet Seera. Checkout how it's made",
      background: "linear-gradient(171deg, rgba(64,224,208,1) 0%, rgba(255,255,255,1) 100%)",
      url: "https://www.youtube.com/embed/hVsboJCGkwE?list=PLZ1eGoTTiYT4glwkHHa7zGh4Ir2Pjr3Pm&index=7",
    },
    {
      name: "Bharma Baingan",
      subtitle: "Stuffed Eggplant Delight",
      emoji: "🍆",
      description: "Discover the secret to making Bharma Baingan",
      background: "linear-gradient(171deg, rgba(147,112,219,1) 0%, rgba(255,255,255,1) 100%)",
      url: "https://www.youtube.com/embed/ns-awrz5ekI?list=PLZ1eGoTTiYT4glwkHHa7zGh4Ir2Pjr3Pm&index=8",
    },
    {
      name: "Kurkuri Bhindi",
      subtitle: "Crispy & Tangy Okra",
      emoji: "🌿",
      description: "Crispy and tangy Kurkuri Bhindi made in minutes in Air Fryer.",
      background: "linear-gradient(171deg, rgba(72,209,204,1) 0%, rgba(255,255,255,1) 100%)",
      url: "https://www.youtube.com/embed/4U6fDJaU6nc?list=PLZ1eGoTTiYT4glwkHHa7zGh4Ir2Pjr3Pm&index=9",
    },
    {
      name: "Rajma",
      subtitle: "Jammu-Style Kidney Beans",
      emoji: "🍛",
      description: "Discover the mouthwatering recipe of Jammu-style Rajma cooked with Indian spices",
      background: "linear-gradient(171deg, rgba(250,224,112,1) 0%, rgba(255,255,255,1) 100%)",
      url: "https://www.youtube.com/embed/XE-Ycfk5Tj4?list=PLZ1eGoTTiYT4glwkHHa7zGh4Ir2Pjr3Pm&index=10",
    },
    {
      name: "Upma",
      subtitle: "Healthy Breakfast Dish",
      emoji: "🌾",
      description: "A healthy and delicious breakfast to kickstart your day.",
      background: "linear-gradient(171deg, rgba(199,108,128,1) 0%, rgba(255,255,255,1) 100%)",
      url: "https://www.youtube.com/embed/fNLurloO2kA?list=PLZ1eGoTTiYT4glwkHHa7zGh4Ir2Pjr3Pm&index=11",
    },
    {
      name: "Bhindi",
      subtitle: "Crispy & Flavorful",
      emoji: "🍽️",
      description: "Learn how to make a delicious and crispy Bhindi recipe.",
      background: "linear-gradient(171deg, rgba(255,183,94,1) 0%, rgba(255,255,255,1) 100%)",
      url: "https://www.youtube.com/embed/zr9S2hed_ks?list=PLZ1eGoTTiYT4glwkHHa7zGh4Ir2Pjr3Pm&index=12",
    },
  ];

  
  ngOnInit(): void {}

  showDetails: boolean = false;
  selectedRecipie: any = "";
  openDetails(recipie: any) {
    this.showDetails = false;
    this.showDetails = true;
    this.selectedRecipie = recipie;
  }

  goBack() {
    this.showDetails = false;
    this.selectedRecipie = undefined;
  }
}
