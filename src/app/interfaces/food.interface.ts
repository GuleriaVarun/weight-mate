export interface FoodItem {
    id: number;
    name: string;
    serving: string;
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
    count: number;
    mealType?: string;
}

export enum MealType {
    BREAKFAST = 'Breakfast',
    LUNCH = 'Lunch',
    DINNER = 'Dinner',
    SNACK = 'Snack'
}

export interface MicroNutrients {
    protein?: { grams: number; calories: number };
    fats?: { grams: number; calories: number };
    carbs?: { grams: number; calories: number };
    water?: number;
}