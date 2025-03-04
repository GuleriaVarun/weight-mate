import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogFoodComponent } from './components/log-food/log-food.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { IonicModule } from '@ionic/angular';
import { RootComponent } from './components/root/root.component';
import { TabActionService } from './services/tab-action.service';
import { FormsModule } from '@angular/forms';
import { CalculateBmrService } from './services/calculate-bmr.service';
import { NutritionCardComponent } from './components/nutrition-card/nutrition-card.component';
import { ThemeService } from './services/theme.service';
import { LanguageService } from './services/language.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { MessageBannerComponent } from './components/message-banner/message-banner.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProgressTrackerComponent } from './components/progress-tracker/progress-tracker.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { DashboardHeaderComponent } from './components/v2/dashboard-header/dashboard-header.component';
import { DashboardCaloriesCardComponent } from './components/v2/dashboard-calories-card/dashboard-calories-card.component';
import { DashboardMicronutrientsCardComponent } from './components/v2/dashboard-micronutrients-card/dashboard-micronutrients-card.component';
import { DashboardMealsCardComponent } from './components/v2/dashboard-meals-card/dashboard-meals-card.component';
import { DashboardProgressCardComponent } from './components/v2/dashboard-progress-card/dashboard-progress-card.component';
import { DashboardDiscoverCardComponent } from './components/v2/dashboard-discover-card/dashboard-discover-card.component';
import { DashboardFooterMenuComponent } from './components/v2/dashboard-footer-menu/dashboard-footer-menu.component';
import { DiscoverRecipiesComponent } from './components/v2/dashboard-discover-card/discover-recipies/discover-recipies.component';
import { DiscoverWorkoutsComponent } from './components/v2/dashboard-discover-card/discover-workouts/discover-workouts.component';
import { PlayRecepieComponent } from './components/v2/dashboard-discover-card/discover-recipies/play-recepie/play-recepie.component';
import { SafePipe } from './services/safe.pipe';
import { UpdateMealComponent } from './components/v2/dashboard-meals-card/update-meal/update-meal.component';
import { WeightTrackerComponent } from './components/v2/dashboard-progress-card/weight-tracker/weight-tracker.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    LogFoodComponent,
    CalendarComponent,
    RootComponent,
    NutritionCardComponent,
    MessageBannerComponent,
    WeightTrackerComponent,
    DashboardComponent,
    ProgressTrackerComponent,
    DiscoverComponent,
    DashboardHeaderComponent,
    DashboardCaloriesCardComponent,
    DashboardMicronutrientsCardComponent,
    DashboardMealsCardComponent,
    DashboardProgressCardComponent,
    DashboardDiscoverCardComponent,
    DashboardFooterMenuComponent,
    DiscoverRecipiesComponent,
    DiscoverWorkoutsComponent,
    PlayRecepieComponent,
    SafePipe,
    UpdateMealComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    TabActionService,
    CalculateBmrService,
    ThemeService,
    LanguageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
