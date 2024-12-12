import { Component, OnInit } from '@angular/core';
import { TabActionService } from 'src/app/services/tab-action.service';

@Component({
  selector: 'app-message-banner',
  templateUrl: './message-banner.component.html',
  styleUrls: ['./message-banner.component.scss']
})
export class MessageBannerComponent implements OnInit {
  constructor(public tabActionService: TabActionService) { }

  ngOnInit(): void {
  }

}
