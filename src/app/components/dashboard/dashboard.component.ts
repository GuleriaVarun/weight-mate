import { Component, OnInit } from "@angular/core";
import { TabActionService } from "src/app/services/tab-action.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {

  constructor(
    public tabActionService: TabActionService,
  ) {}

  ngOnInit(): void {
  }
}
