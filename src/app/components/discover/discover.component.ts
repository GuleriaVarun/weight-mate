import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  // @ViewChild("slides", { static: false }) slides!: IonSlides;
  // selectedSegment = "0";

  // slideOpts = {
  //   initialSlide: 0,
  //   speed: 400,
  // };

  // @ViewChild("discoverSlides", { static: false }) discoverSlides!: IonSlides;
  // selectedDiscoverSegment = "0";

  // discoverSlideOpts = {
  //   initialSlide: 0,
  //   speed: 400,
  // };

  // videoUrl: string = '';
  // playVideo: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  // playVideoFun(url: string) {
  //   this.playVideo = true;
  //   this.videoUrl = url;
  //   window.open(url)
  // }

  // async onDiscoverSegmentChange(event: any) {
  //   const index = parseInt(event.detail.value, 10);
  //   await this.discoverSlides.slideTo(index);
  // }

  // async onDiscoverSlideDidChange() {
  //   const index = await this.discoverSlides.getActiveIndex();
  //   this.selectedDiscoverSegment = index.toString();
  // }
}
