import emailjs from "emailjs-com";
import { Component, OnInit, ViewChild } from "@angular/core";
import { OverlayEventDetail } from "@ionic/core";
import { ActionSheetController, IonModal, IonSlides } from "@ionic/angular";
import { TabActionService } from "src/app/services/tab-action.service";
import { ThemeService } from "src/app/services/theme.service";
import { LanguageService } from "src/app/services/language.service";
import { Language } from "src/app/interfaces/language.interface";
import { AdsService } from "src/app/services/ads.service";
import { PhotoService } from "src/app/services/photo.service";
import { FoodItem } from "src/app/interfaces/food.interface";

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
  isFoodLogModalOpen: boolean = false;
  isWeightTrackerModalOpen: boolean = false;
  selectedMealType: string | undefined = undefined;
  updateLoggedFood: any[] = [];

  @ViewChild("slides", { static: false }) slides!: IonSlides;
  selectedSegment = "0";

  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  @ViewChild("discoverSlides", { static: false }) discoverSlides!: IonSlides;
  selectedDiscoverSegment = "0";

  discoverSlideOpts = {
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

  showFoodCard: boolean = false;

  constructor(
    public readonly tabActionService: TabActionService,
    public languageService: LanguageService,
    public themeService: ThemeService,
    private photoService: PhotoService,
    private adsService: AdsService,
    private actionSheetCtrl: ActionSheetController
  ) {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Choose Action",
      buttons: [
        {
          text: "Open Camera",
          handler: () => {
            this.photoService.clickPhoto().then(() => {
              this.updateProfilePicture();
            });
          },
        },
        {
          text: "Open Gallery",
          handler: () => {
            this.photoService.uploadFromGallery().then(() => {
              this.updateProfilePicture();
            });
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
    });

    await actionSheet.present();
    await actionSheet.onDidDismiss();
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

  ngOnInit(): void {
    this.removeHighLight();
  }

  clearStorage() {
    localStorage.clear();
    window.location.reload();
  }

  openAccountModal() {
    if (this.tabActionService.userInfo.profilePicture) {
      this.updateProfilePicture();
    }
    this.isAccountModalOpen = true;
  }

  openFoodLogModal() {
    this.isFoodLogModalOpen = true;
    this.selectedMealToggle = 0;
    this.adsService.showAdBanner();
  }

  openGoalModal() {
    this.isGoalModalOpen = true;
    this.adsService.showAdBanner();
  }

  openFeedbackModal() {
    this.isFeedbackModalOpen = true;
  }

  openWeightTrackerModal() {
    this.isWeightTrackerModalOpen = true;
    this.adsService.showAdBanner();
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

  onWillFoodDismiss() {
    this.selectedMealType = undefined;
    this.adsService.showInterstitialAd();
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

  selectedMealToggle: any = 0;
  mealToggle(selectedValue: any) {
    if (selectedValue === 1) {
      const getFoodForCurrentDate =
        this.tabActionService.userInfo.foodLogged?.find((food) => {
          return food.date === this.tabActionService.currentDate;
        });

      if (getFoodForCurrentDate) {
        this.updateLoggedFood = getFoodForCurrentDate.foodList;
      }

      this.showFoodCard = true;
    } else {
      this.showFoodCard = false;
    }
    this.selectedMealToggle = selectedValue;
  }

  getBreakFastList() {
    return this.updateLoggedFood.filter(
      (food) => food.mealType === "breakfast"
    );
  }

  getBreakFastTotalCalories() {
    return this.getBreakFastList().reduce((acc, i) => ( i.calories* i.count) + acc, 0);
  }

  getLunchList() {
    return this.updateLoggedFood.filter((food) => food.mealType === "lunch");
  }

  getLunchTotalCalories() {
    return this.getLunchList().reduce((acc, i) => ( i.calories* i.count) + acc, 0);
  }

  getSnacksList() {
    return this.updateLoggedFood.filter((food) => food.mealType === "snacks");
  }

  getSnacksTotalCalories() {
    return this.getSnacksList().reduce((acc, i) => ( i.calories* i.count) + acc, 0);
  }

  getDinnerList() {
    return this.updateLoggedFood.filter((food) => food.mealType === "dinner");
  }

  getDinnerTotalCalories() {
    return this.getDinnerList().reduce((acc, i) => ( i.calories* i.count) + acc, 0);
  }

  deleteFood(food: any, ev: any) {
    const getFoodForCurrentDate =
      this.tabActionService.userInfo.foodLogged?.find((food) => {
        return food.date === this.tabActionService.currentDate;
      });

    if (getFoodForCurrentDate) {
      const foodSelected = getFoodForCurrentDate.foodList.find(
        (f: any) => f.id === food.id
      );

      if (foodSelected && foodSelected.count > 1) {
        foodSelected.count = foodSelected.count - 1;
      } else if (foodSelected && food.count === 1) {
        const index = getFoodForCurrentDate.foodList.findIndex(
          (f: any) => f.id === food.id
        );
        getFoodForCurrentDate.foodList.splice(index, 1);

        this.updateLoggedFood = this.updateLoggedFood.filter(
          (f) => f.id !== food.id
        );
      }
    }

    this.tabActionService.presentToast(
      "bottom",
      `${(food as FoodItem).name} Delete!`
    );
    this.tabActionService.updateLocalStorage(this.tabActionService.userInfo);
    this.tabActionService.reloadHomePageForCurrentDate();
    this.tabActionService.foodAddEvent();
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

  async onDiscoverSegmentChange(event: any) {
    const index = parseInt(event.detail.value, 10);
    await this.discoverSlides.slideTo(index);
    this.mealToggle(index);
  }

  async onDiscoverSlideDidChange() {
    const index = await this.discoverSlides.getActiveIndex();
    this.selectedDiscoverSegment = index.toString();
  }
}
