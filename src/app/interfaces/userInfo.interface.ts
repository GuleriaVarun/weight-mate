import { MicroNutrients } from "./food.interface";

export interface PersonalPreference {
  loseWeightFast?: boolean;
  loseWeightSlow?: boolean;
  gainWeightFast?: boolean;
  gainWeightSlow?: boolean;
  maintainWeight?: boolean;
  recommendedCaloriesMaintain?: string;
  recommendedCaloriesGain?: string;
  recommendedCaloriesLose?: string;
}

interface WeightRecord {
  date: string;
  weight: string;
}

export interface UserInfo {
  id?: string;
  personalPreference?: PersonalPreference;
  name?: string;
  age?: number;
  gender?: string;
  weight?: number;
  heightFt?: number;
  heightInc?: number;
  lifestyle?: string;
  foodLogged?: any[];
  macros?: MicroNutrients;
  selectedLanguage?: string;
  recordedWeight?: WeightRecord[];
}
