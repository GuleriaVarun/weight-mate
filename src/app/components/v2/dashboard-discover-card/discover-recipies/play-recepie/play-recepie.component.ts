import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-recepie',
  templateUrl: './play-recepie.component.html',
  styleUrls: ['./play-recepie.component.scss']
})
export class PlayRecepieComponent implements OnInit {

  constructor() {}
  
  videoUrl: string = '';
  title: string = '';
  description: string = '';

  ngOnInit(): void {
    const recepie = (JSON.parse(sessionStorage.getItem('recepie') as any) as any);
    console.log('***** : ', recepie);
    this.videoUrl = recepie.url as string;
    this.title = recepie.name as string;
    this.description = recepie.description as string;
  }

}
