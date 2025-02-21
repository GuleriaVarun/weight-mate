import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMicronutrientsCardComponent } from './dashboard-micronutrients-card.component';

describe('DashboardMicronutrientsCardComponent', () => {
  let component: DashboardMicronutrientsCardComponent;
  let fixture: ComponentFixture<DashboardMicronutrientsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMicronutrientsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMicronutrientsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
