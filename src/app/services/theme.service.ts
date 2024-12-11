import { Injectable } from '@angular/core';
import { light, Theme, dark, defaultTheme } from 'src/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private active: Theme = light;
  constructor() {}

  switchToLightTheme() {
    this.active = light;
    Object.keys(this.active.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }

  switchToDarkTheme() {
    this.active = dark;
    Object.keys(this.active.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }

  switchToDefaultTheme() {
    this.active = defaultTheme;
    Object.keys(this.active.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }
}
