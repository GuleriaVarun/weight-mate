import { Component, OnInit, ViewChild } from "@angular/core";
import { Language } from "src/app/interfaces/language.interface";
import { TabActionService } from "src/app/services/tab-action.service";
import { ThemeService } from "src/app/services/theme.service";
import emailjs from "emailjs-com";
import { ActionSheetController, IonModal } from "@ionic/angular";
import { AdsService } from "src/app/services/ads.service";
import { LanguageService } from "src/app/services/language.service";
import { Router } from "@angular/router";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { GeminiService } from "src/app/services/gemini.service";

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
    private actionSheetCtrl: ActionSheetController,
    private geminiService: GeminiService
  ) {}

  ngOnInit(): void {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image',
      buttons: [
        {
          text: 'Choose from Gallery',
          icon: 'images',
          handler: () => {
            this.selectImage(CameraSource.Photos);
          }
        },
        {
          text: 'Open Camera',
          icon: 'camera',
          handler: () => {
            this.selectImage(CameraSource.Camera);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async selectImage(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source
      });

      this.tabActionService.userInfo.profilePicture = `data:image/jpeg;base64,${image.base64String}`;

      this.tabActionService.setUserInfo(this.tabActionService.userInfo);
      this.tabActionService.updateLocalStorage(this.tabActionService.userInfo);
    } catch (error) {
      console.error('Image selection failed:', error);
    }
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

  logout() {
    localStorage.clear();
    this.isAccountModalOpen = false;
    this.modal.dismiss(null, "cancel");
    window.location.reload();
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
    this.isChatModalOpen = false;
    this.adsService.hideAdBanner();
  }

  isChatModalOpen: boolean = false;
  openChat() {
    this.isChatModalOpen = true;
  }

  userInput: string = '';
  responseText: string = '';
  messages: { text: string; sent: boolean }[] = [];
  newMessage = '';
  generateResponse() {
    if (!this.userInput) return;
    
    this.geminiService.generateText(this.userInput).subscribe(
      (res) => {
        this.responseText = res?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.';
      },
      (err) => {
        console.error('Error:', err);
        this.responseText = 'Error generating response.';
      }
    );
  }

  sendMessage() {
    if (!this.newMessage) return;

    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, sent: true });
      
      this.geminiService.generateText(this.newMessage).subscribe(
        (res) => {
          this.responseText = res?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.';
          let formattedResponse = this.formatBotResponse(this.responseText);
          this.messages.push({ text: formattedResponse, sent: false });
          this.newMessage = '';
        },
        (err) => {
          console.error('Error:', err);
          this.responseText = 'Error generating response.';
        }
      );
    }
  }

  formatBotResponse(response: string): string {
    return response
      .replace(/\n/g, '<br>')                      // Convert newlines to <br>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Convert **bold** to <strong>
      .replace(/\* (.*?)<br>/g, '<li>$1</li>')     // Convert * bullets to <li>
      .replace(/<br><li>/g, '<ul><li>') + '</ul>'; // Wrap <li> in <ul>
  }
}
