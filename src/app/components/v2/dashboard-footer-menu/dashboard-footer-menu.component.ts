import { Component, OnInit, ViewChild } from "@angular/core";
import { Language } from "src/app/interfaces/language.interface";
import { TabActionService } from "src/app/services/tab-action.service";
import { ThemeService } from "src/app/services/theme.service";
import emailjs from "emailjs-com";
import { IonModal } from "@ionic/angular";
import { AdsService } from "src/app/services/ads.service";
import { LanguageService } from "src/app/services/language.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard-footer-menu",
  templateUrl: "./dashboard-footer-menu.component.html",
  styleUrls: ["./dashboard-footer-menu.component.scss"],
})
export class DashboardFooterMenuComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  isGoalModalOpen: boolean = false;
  isAccountModalOpen: boolean = false;
  isFeedbackModalOpen: boolean = false;
  isFoodLogModalOpen: boolean = false;
  isWeightTrackerModalOpen: boolean = false;
  feedback = {
    name: "",
    email: "",
    message: "",
  };
  name: string | undefined;

  languageList: Language[] = [
    {
      name: "English",
      code: "en",
    },
    {
      name: "Hindi",
      code: "hi",
    },
    {
      name: "French",
      code: "fr",
    },
  ];

  constructor(
    public tabActionService: TabActionService,
    public themeService: ThemeService,
    public adsService: AdsService,
    public languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  sendFeedback() {
    if (!this.feedback.message) {
      this.tabActionService.presentToast("top", "Please fill all the fields");
      return;
    }

    const button = document.getElementById("send-feedback-button");
    button?.setAttribute("disabled", "true");
    const templateParams = {
      to_name: "Weight Mate Admin",
      from_name: this.tabActionService.userInfo.name,
      message: `User Id: ${this.tabActionService.userInfo.id}: ${this.feedback.message}`,
    };

    emailjs
      .send(
        "service_tdjqco5",
        "template_xo0l0e9",
        templateParams,
        "1zb2eTWggf-iaI7eJ"
      )
      .then(() => {
        this.tabActionService.presentToast(
          "bottom",
          "Feedback sent successfully!"
        );
        this.modal.dismiss(this.name, "confirm");
        this.isFeedbackModalOpen = false;
        this.feedback = {
          name: "",
          email: "",
          message: "",
        };
        button?.setAttribute("disabled", "false");
      })
      .catch((error) => {
        console.error("Error sending feedback", error);
        this.tabActionService.presentToast("bottom", "Error sending feedback");
        this.modal.dismiss(this.name, "confirm");
        button?.setAttribute("disabled", "false");
      });
  }

  logout() {
    localStorage.clear();
    this.modal.dismiss(null, "cancel");
    this.router.navigate(['/login']);
  }

  openAccountModal() {
    if (this.tabActionService.userInfo.profilePicture) {
      this.updateProfilePicture();
    }
    this.isAccountModalOpen = true;
  }

  private updateProfilePicture() {
    this.tabActionService.updateLocalStorage(this.tabActionService.userInfo);
    const imageElement = document.getElementsByClassName("avatar-img");
    if (imageElement && imageElement[0]) {
      (imageElement[0] as any).setAttribute(
        "src",
        this.tabActionService.userInfo.profilePicture
      );
    }
  }

  openFeedbackModal() {
    this.isFeedbackModalOpen = true;
  }

  cancel() {
    this.modal.dismiss(null, "cancel");
    this.isGoalModalOpen = false;
    this.isAccountModalOpen = false;
    this.isFeedbackModalOpen = false;
    this.isFoodLogModalOpen = false;
    this.isWeightTrackerModalOpen = false;
    this.adsService.hideAdBanner();
  }
}
