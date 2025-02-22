import { Component, OnInit } from '@angular/core';
import { LoggedInUser } from 'src/app/interfaces/userInfo.interface';
import { TabActionService } from 'src/app/services/tab-action.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  loggedInUserData: LoggedInUser = {
    emailId: '',
    name: '',
    profilePicture: ''
  }
  constructor(public tabActionService: TabActionService) { }

  ngOnInit(): void {
    const storage = this.tabActionService.getLoggedInUserData();
    this.loggedInUserData = storage ? JSON.parse(storage) : {};
  }

}
