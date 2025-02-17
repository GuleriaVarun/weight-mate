import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCaloriesCardComponent } from './dashboard-calories-card.component';

describe('DashboardCaloriesCardComponent', () => {
  let component: DashboardCaloriesCardComponent;
  let fixture: ComponentFixture<DashboardCaloriesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCaloriesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCaloriesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
