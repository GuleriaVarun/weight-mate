import { Injectable } from '@angular/core';
import { AdMob, AdOptions, BannerAdOptions, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';

const options: BannerAdOptions = {
  adId: 'ca-app-pub-6458339069545467/6448045816',
  adSize: BannerAdSize.BANNER,
  position: BannerAdPosition.BOTTOM_CENTER,
  margin: 60
};

const interstitialOptions: AdOptions = {
  adId: 'ca-app-pub-6458339069545467/8708097828',
};

@Injectable({
  providedIn: "root",
})
export class AdsService {
  constructor() {}

  showAdBanner() {
    AdMob.showBanner(options);
  }

  hideAdBanner() {
    try {
      AdMob.hideBanner();
    } catch (err) {}
  }

  async showInterstitialAd() {
    await AdMob.prepareInterstitial(interstitialOptions);

    AdMob.showInterstitial();
  }
}
