import { Component, OnInit } from '@angular/core';
import { TabActionService } from 'src/app/services/tab-action.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedInUser: any;

  public alertButtons = ['OK'];
  public alertInputs = [
    {
      placeholder: 'Name',
    },
    {
      placeholder: 'Nickname (max 8 characters)',
      attributes: {
        maxlength: 8,
      },
    },
    {
      type: 'number',
      placeholder: 'Age',
      min: 1,
      max: 100,
    },
  ];

  constructor(public readonly tabActionService: TabActionService) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('userInfo') as any) || [];
    if (this.loggedInUser) {
      this.tabActionService.calculateTotalNutrition(
        this.loggedInUser?.foodLogged
      );
    }
  }
}
