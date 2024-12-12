import { Component, OnInit } from '@angular/core';
import { TabActionService } from './services/tab-action.service';
import { UserInfo } from './interfaces/userInfo.interface';
import { CalculateBmrService } from './services/calculate-bmr.service';
import { AlertController } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';
import { MicroNutrients } from './interfaces/food.interface';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'weightMate';
  welcomeScreen: boolean = true;
  showMainScreen: boolean = false;

  showDeatils: boolean = false;
  userName!: string;
  userAge!: number;
  showInfoDialog: boolean = true;

  showGoals: boolean = false;
  weight!: number;
  feet!: number;
  inch!: number;

  showLifeStyle: boolean = false;

  showPreferences: boolean = false;
  loseWeightFastCalsRequired: string = '';
  gainWeightFastCalsRequired: string = '';
  maintainWeight: string = '';
  estimatedWeightLoss: string = '';
  estimatedWeightGain: string = '';

  selectedGender!: any;

  genderOptions = [
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
  ];

  showWelcomeMessage: boolean = false;

  selectedGoal!: any;
  goalsOptions = [
    { name: 'Lose Weight', value: 'lose' },
    { name: 'Gain Weight', value: 'gain' },
    { name: 'Maintain', value: 'maintain' },
  ];

  selectedLifeStyle: any;
  lifestyleOptions = [
    { name: 'Sedentary', value: 'sedentary' },
    { name: 'Light', value: 'light' },
    { name: 'Moderate', value: 'moderate' },
    { name: 'Active', value: 'active' },
    { name: 'Very Active', value: 'veryActive' },
  ];

  // Main User Object
  userInfo: UserInfo = {};
  macros: MicroNutrients = {};

  constructor(
    public readonly tabActionService: TabActionService,
    private readonly bmrService: CalculateBmrService,
    private alertController: AlertController,
    private languageService: LanguageService
  ) {
    this.languageService.initializeLanguage();
  }

  ngOnInit() {
    this.setStatusBarColor();
    const userInfo = JSON.parse(localStorage.getItem('userInfo') as any);

    const TIMER = this.userInfo?.name ? 1000 : 3000;
    setTimeout(() => {
      this.showDeatils = true;
      this.welcomeScreen = false;
      
      if (userInfo) {
        this.showInfoDialog = false;
        this.showMainScreen = true;
        this.tabActionService.setUserInfo(userInfo);

        this.userAge = userInfo.age as any;
        this.weight = userInfo.weight as any;
        this.feet = userInfo.heightFt as any;
        this.inch = userInfo.heightInc as any;
          this.selectedGender = userInfo.gender;
        this.selectedLifeStyle = userInfo.lifestyle;
        this.setDetails();
        this.userInfo.macros = this.macros;
      }
    }, TIMER);
  }

  async submitDetails() {
    if (this.inch <= 0) {
      this.inch = 0;
    }
    
    if (
      this.userName === '' ||
      this.userAge === 0 ||
      this.weight === 0 ||
      this.feet === 0
    ) {
      this.showAlertForMissingFields();
    } else {
      this.showDeatils = false;
      this.showGoals = true;
    }
  }

  submitGoal() {
    if (!this.selectedGoal) {
      this.showAlertForMissingFields();
    } else {
      this.showGoals = false;
      this.showLifeStyle = true;
    }
  }

  submitLifeStyle() {
    if (!this.selectedLifeStyle) {
      this.showAlertForMissingFields();
    } else {
      this.setDetails();
      this.showLifeStyle = false;
      this.showPreferences = true;
    }
  }

  submitPreferences() {
    this.showPreferences = false;
    this.showWelcomeMessage = true;
    const firstName = this.userName.split(' ')[0];
    const userInfo: UserInfo = {
      id: `${firstName}_${Math.random()}`,
      name: this.userName,
      age: this.userAge,
      gender: this.selectedGender,
      heightFt: this.feet,
      heightInc: this.inch,
      weight: this.weight,
      lifestyle: this.selectedLifeStyle,
      macros: this.macros,
      personalPreference: {
        loseWeightFast: this.userInfo?.personalPreference?.loseWeightFast,
        loseWeightSlow: this.userInfo?.personalPreference?.loseWeightSlow,
        gainWeightFast: this.userInfo?.personalPreference?.gainWeightFast,
        gainWeightSlow: this.userInfo.personalPreference?.gainWeightSlow,
        maintainWeight: this.userInfo.personalPreference?.maintainWeight,
        recommendedCaloriesMaintain: this.maintainWeight,
        recommendedCaloriesGain:
          this.userInfo.personalPreference?.recommendedCaloriesGain,
        recommendedCaloriesLose: this.loseWeightFastCalsRequired,
      },
      foodLogged: [],
    };

    this.tabActionService.setUserInfo(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setTimeout(() => {
      this.showInfoDialog = false;
      this.showWelcomeMessage = false;
      this.showMainScreen = true;
    }, 3500);
  }

  setDetails() {
    const age = this.userAge; // age in years
    const weightKg = this.weight; // weight in kg
    const heightFeet = this.feet; // height in feet
    const heightInches = this.inch; // additional height in inches
    const gender = this.selectedGender;
    const activityLevel = this.selectedLifeStyle;
    const goal = this.selectedGoal;

    // Step 1: Calculate BMR
    const bmr = this.bmrService.calculateBMR(
      age,
      weightKg,
      heightFeet,
      heightInches,
      gender
    );

    // Step 2: Calculate TDEE based on activity level
    const tdee = this.bmrService.calculateTDEE(bmr, activityLevel);

    let caloriesForWeightLoss = 0;
    let caloriesForWeightGain = 0;
    // Step 3: Calculate calorie intake for fast weight loss (e.g., 25% deficit)
    if (goal === 'lose') {
      caloriesForWeightLoss = this.bmrService.calculateCaloriesForWeightLoss(
        tdee,
        25
      );
    } else if (goal === 'gain') {
      caloriesForWeightGain = this.bmrService.calculateCaloriesForWeightGain(
        tdee,
        25
      );
    }

    // Step 4: Estimate weekly weight loss
    const weeklyWeightLossKg = this.bmrService.calculateWeeklyWeightLoss(
      caloriesForWeightLoss,
      tdee
    );

    const weeklyWeightGainKg = this.bmrService.calculateWeeklyWeightLoss(
      caloriesForWeightGain,
      tdee
    );

    this.maintainWeight = `${Math.trunc(tdee)} kcal`;
    this.tabActionService.maintainWeight = Math.trunc(tdee);
    this.loseWeightFastCalsRequired = `${Math.trunc(
      caloriesForWeightLoss
    )} kcal`;
    this.gainWeightFastCalsRequired = `${Math.trunc(
      caloriesForWeightGain
    )} kcal`;
    this.estimatedWeightLoss = `${weeklyWeightLossKg.toFixed(2)} kg`;
    this.estimatedWeightGain = `${weeklyWeightGainKg.toFixed(2)} kg`;

    this.macros = this.bmrService.calculateMacros(tdee);
  }

  handleGoalChange(ev: any) {
    this.selectedGoal = ev.detail.value;
  }

  handleGenderChange(ev: any) {
    this.selectedGender = ev.detail.value.value;
  }

  handleLifeStyleChange(ev: any) {
    this.selectedLifeStyle = ev.detail.value;
  }

  async showAlertForMissingFields() {
    const alert = await this.alertController.create({
      header: 'Some fileds are missing',
      message: 'Please fill all the fields to proceed',
      buttons: ['Ok'],
    });

    await alert.present();
  }

  setStatusBarColor() {
    StatusBar.setBackgroundColor({ color: '#072214' });
  }
}
