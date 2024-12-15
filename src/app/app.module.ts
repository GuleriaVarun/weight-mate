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
import { WeightTrackerComponent } from './components/weight-tracker/weight-tracker.component';

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
