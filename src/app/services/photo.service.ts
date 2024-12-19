import { Injectable } from "@angular/core";
import {
  Camera,
  CameraResultType,
  CameraSource,
} from "@capacitor/camera";
import { TabActionService } from "./tab-action.service";

@Injectable({
  providedIn: "root",
})
export class PhotoService {
  constructor(private tabActionService: TabActionService) {}

  public async clickPhoto() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    this.tabActionService.userInfo.profilePicture = capturedPhoto.webPath;
    return capturedPhoto.webPath;
  }

  public async uploadFromGallery() {
    try {
      const capturedPhoto = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, // Base64 format
        source: CameraSource.Photos, // Open the gallery
      });

      // Upload the image
      this.tabActionService.userInfo.profilePicture = capturedPhoto.webPath;

      return capturedPhoto.webPath;
    } catch (error) {
      console.error("Error selecting image:", error);

      return undefined;
    }
  }
}
