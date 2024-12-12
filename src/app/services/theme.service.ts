import { Injectable } from '@angular/core';
import { light, Theme, dark, defaultTheme } from 'src/theme';
import { TabActionService } from './tab-action.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private active: Theme = light;
  constructor(private tabActionService: TabActionService) {}

  switchToLightTheme() {
    this.tabActionService.presentToast("top", "Switched to light theme !");
    this.active = light;
    Object.keys(this.active.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }

  switchToDarkTheme() {
    this.tabActionService.presentToast("top", "Switched to dark theme !");
    this.active = dark;
    Object.keys(this.active.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }

  switchToDefaultTheme() {
    this.tabActionService.presentToast("top", "Switched to default theme !");
    this.active = defaultTheme;
    Object.keys(this.active.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }
}
