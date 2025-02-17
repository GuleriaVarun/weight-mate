import { Component, OnInit } from "@angular/core";
import { TabActionService } from "src/app/services/tab-action.service";
import { AdMob } from '@capacitor-community/admob';
import ideasList from '../../utilities/healthy-ideas.json';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  ideaOfTheDay: string = '';

  constructor(
    public tabActionService: TabActionService,
  ) {}

  ngOnInit(): void {
    if (this.tabActionService.userInfo.foodLogged?.length === 0) {
      setTimeout(() => {
        this.tabActionService.presentToast('top', "Let's log your first meal for today!");
      }, 8000);
    }

    AdMob.initialize();
    this.getIdeaForTheDay();
  }

  getIdeaForTheDay() {
    const ideas = ideasList.ideas;
    const randomIndex = Math.floor(Math.random() * ideas.length);
    this.ideaOfTheDay = ideas[randomIndex];
  }
}
