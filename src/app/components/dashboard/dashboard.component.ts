import { Component, OnInit } from "@angular/core";
import { TabActionService } from "src/app/services/tab-action.service";
import { AdMob } from '@capacitor-community/admob';
import ideasList from '../../utilities/healthy-ideas.json';
import { Platform, ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
declare let navigator: any; // Avoids TypeScript error

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  ideaOfTheDay: string = '';

  constructor(
    public tabActionService: TabActionService,
    private platform: Platform,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tabActionService.userInfo.foodLogged?.length === 0) {
      setTimeout(() => {
        this.tabActionService.presentToast('top', "Let's log your first meal for today!");
      }, 8000);
    }

    AdMob.initialize();
    this.getIdeaForTheDay();
    this.initializeBackButton();
  }

  getIdeaForTheDay() {
    const ideas = ideasList.ideas;
    const randomIndex = Math.floor(Math.random() * ideas.length);
    this.ideaOfTheDay = ideas[randomIndex];
  }

  initializeBackButton() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(10, async () => {
        // Check if we can go back in history
        if (this.router.url !== '/home') {
          window.history.back();
        } else {
          this.showExitConfirmation();
        }
      });
    });
  }

  async showExitConfirmation() {
      const toast = await this.toastCtrl.create({
        message: 'Press back again to exit',
        duration: 2000,
        position: 'bottom',
      });
      await toast.present();
  }

}
