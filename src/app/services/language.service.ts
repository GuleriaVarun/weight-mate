import { Injectable } from '@angular/core';
import { Language } from '../interfaces/language.interface';
import { TranslateService } from '@ngx-translate/core';
import { TabActionService } from './tab-action.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translate: TranslateService, private tabActionService: TabActionService) {
    this.initializeLanguage();
  }

  initializeLanguage() {
    const lang = this.tabActionService.userInfo?.selectedLanguage ? this.tabActionService.userInfo?.selectedLanguage : 'en';
    this.translate.setDefaultLang(lang);
    this.setUserLanguage('en');
  }

  changeLanguage(language: Language) {
    this.translate.use(language.code);
    this.tabActionService.presentToast("top", `Language changed to ${language.name}`);
    this.setUserLanguage(language.code);
  }

  setUserLanguage(code: string) {
    if (this.tabActionService && this.tabActionService.userInfo) {
      this.tabActionService.userInfo.selectedLanguage = code || 'en';
    }
    this.tabActionService.setUserInfo(this.tabActionService.userInfo);
  }

  instant(key: string) {
    return this.translate.instant(key);
  }
}
