import emailjs from "emailjs-com";
import { Component, OnInit, ViewChild } from "@angular/core";
import { OverlayEventDetail } from "@ionic/core";
import { IonModal, IonSlides } from "@ionic/angular";
import { TabActionService } from "src/app/services/tab-action.service";
import { ThemeService } from "src/app/services/theme.service";
import { LanguageService } from "src/app/services/language.service";
import { Language } from "src/app/interfaces/language.interface";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  feedback = {
    name: "",
    email: "",
    message: "",
  };

  @ViewChild(IonModal) modal!: IonModal;
  name: string | undefined;
  message =
    "This modal example uses triggers to automatically open a modal when the button is clicked.";
  isGoalModalOpen: boolean = false;
  isAccountModalOpen: boolean = false;
  isFeedbackModalOpen: boolean = false;
  selectedMealType: string | undefined = undefined;
  updateLoggedFood: any[] = [];

  @ViewChild("slides", { static: false }) slides!: IonSlides;
  selectedSegment = "0";

  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

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
    public readonly tabActionService: TabActionService,
    public languageService: LanguageService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.removeHighLight();
  }

  clearStorage() {
    localStorage.clear();
    window.location.reload();
  }

  openAccountModal() {
    this.isAccountModalOpen = true;
  }

  openGoalModal() {
    this.isGoalModalOpen = true;
  }

  openFeedbackModal() {
    this.isFeedbackModalOpen = true;
  }

  cancel() {
    this.modal.dismiss(null, "cancel");
    this.isGoalModalOpen = false;
    this.isAccountModalOpen = false;
    this.isFeedbackModalOpen = false;
  }

  confirm() {
    this.selectedMealType = undefined;
    this.modal.dismiss(this.name, "confirm");
  }

  onWillDismiss(event: Event) {
    this.selectedMealType = undefined;
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === "done") {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  selectMealType(mealType: string) {
    this.removeHighLight();
    const ele = document.getElementById(mealType);
    ele?.setAttribute("color", "primary");
    this.selectedMealType = mealType;
  }

  removeHighLight() {
    const ele = document.getElementById("breakfast");
    ele?.setAttribute("color", "black");

    const ele1 = document.getElementById("lunch");
    ele1?.setAttribute("color", "black");

    const ele2 = document.getElementById("dinner");
    ele2?.setAttribute("color", "black");

    const ele3 = document.getElementById("snacks");
    ele3?.setAttribute("color", "black");
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }

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
          "top",
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
        this.tabActionService.presentToast("top", "Error sending feedback");
        this.modal.dismiss(this.name, "confirm");
        button?.setAttribute("disabled", "false");
      });
  }

  mealToggle(selectedValue: any) {
    if (selectedValue === 1) {
      const getFoodForCurrentDate =
        this.tabActionService.userInfo.foodLogged?.find((food) => {
          return food.date === this.tabActionService.currentDate;
        });

      if (getFoodForCurrentDate) {
        this.updateLoggedFood = getFoodForCurrentDate.foodList;
      }
    }
  }

  deleteFood(food: any, ev: any) {
    const getFoodForCurrentDate =
      this.tabActionService.userInfo.foodLogged?.find((food) => {
        return food.date === this.tabActionService.currentDate;
      });

    if (getFoodForCurrentDate) {
      const index = getFoodForCurrentDate.foodList.findIndex(
        (f: any) => f.id === food.id
      );
      getFoodForCurrentDate.foodList.splice(index, 1);
    }

    this.updateLoggedFood = this.updateLoggedFood.filter(
      (f) => f.id !== food.id
    );

    this.tabActionService.updateLocalStorage(this.tabActionService.userInfo);
    this.tabActionService.reloadHomePageForCurrentDate();
    ev.stopPropagation();
  }

  async onSegmentChange(event: any) {
    const index = parseInt(event.detail.value, 10);
    await this.slides.slideTo(index);
    this.mealToggle(index);
  }

  async onSlideDidChange() {
    const index = await this.slides.getActiveIndex();
    this.selectedSegment = index.toString();
  }
}
