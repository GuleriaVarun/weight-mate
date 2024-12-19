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

export interface WeightRecord {
  date: string;
  weight: number;
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
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
  profilePicture?: string;
}
