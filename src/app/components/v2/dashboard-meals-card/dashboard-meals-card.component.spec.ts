import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMealsCardComponent } from './dashboard-meals-card.component';

describe('DashboardMealsCardComponent', () => {
  let component: DashboardMealsCardComponent;
  let fixture: ComponentFixture<DashboardMealsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMealsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMealsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
