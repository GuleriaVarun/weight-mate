import { Injectable } from '@angular/core';
import { MicroNutrients } from '../interfaces/food.interface';

@Injectable({
  providedIn: 'root',
})
export class CalculateBmrService {
  constructor() {}

  calculateBMR(
    age: number,
    weightKg: number,
    heightFeet: number,
    heightInches: number,
    gender: string
  ): number {
    // Convert height to cm
    const heightCm = heightFeet * 30.48 + heightInches * 2.54;

    // Mifflin-St Jeor Equation for BMR
    if (gender === 'male') {
      return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  }

  calculateTDEE(bmr: number, activityLevel: string): number {
    const activityMultipliers: Record<typeof activityLevel, number> = {
      sedentary: 1.2, // little to no exercise
      light: 1.375, // light exercise
      moderate: 1.55, // moderate exercise
      active: 1.725, // daily exercise
      veryActive: 1.9, // intense daily exercise
    };
    return bmr * activityMultipliers[activityLevel];
  }

  calculateCaloriesForWeightLoss(
    tdee: number,
    deficitPercentage: number
  ): number {
    return tdee * (1 - deficitPercentage / 100);
  }

  calculateCaloriesForWeightGain(
    tdee: number,
    surplusPercentage: number
  ): number {
    return tdee * (1 + surplusPercentage / 100);
  }

  calculateMacros(
    tdee: number
  ): MicroNutrients {
    const proteinPercentage = 25; // 25% of calories from protein
    const fatPercentage = 30; // 30% of calories from fat
    const carbPercentage = 45; // 45% of calories from carbs

    // Validate input percentages
    const totalPercentage = proteinPercentage + fatPercentage + carbPercentage;
    if (totalPercentage !== 100) {
      throw new Error('The sum of macronutrient percentages must equal 100.');
    }

    // Macronutrient calorie values per gram
    const CALORIES_PER_GRAM = {
      protein: 4,
      fat: 9,
      carbs: 4,
    };

    // Calculate macronutrient calories
    const proteinCalories = (tdee * proteinPercentage) / 100;
    const fatCalories = (tdee * fatPercentage) / 100;
    const carbCalories = (tdee * carbPercentage) / 100;

    // Calculate macronutrient grams
    const proteinGrams = proteinCalories / CALORIES_PER_GRAM.protein;
    const fatGrams = fatCalories / CALORIES_PER_GRAM.fat;
    const carbGrams = carbCalories / CALORIES_PER_GRAM.carbs;

    // Return the result as an object
    return {
      protein: { grams: proteinGrams, calories: proteinCalories },
      fats: { grams: fatGrams, calories: fatCalories },
      carbs: { grams: carbGrams, calories: carbCalories },
      water: 0
    };
  }

  calculateWeeklyWeightLoss(
    caloriesForWeightLoss: number,
    tdee: number
  ): number {
    const weeklyCaloricDeficit = (tdee - caloriesForWeightLoss) * 7;
    // 1 pound (~0.45 kg) of fat loss = 3500 calories
    return weeklyCaloricDeficit / 3500;
  }

  calculateWeeklyWeightGain(
    caloriesForWeightGain: number,
    tdee: number
  ): number {
    const weeklyCaloricSurplus = (caloriesForWeightGain - tdee) * 7;
    // 1 pound (~0.45 kg) of weight gain = 3500 calories
    return weeklyCaloricSurplus / 3500;
  }
}
