import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProgressCardComponent } from './dashboard-progress-card.component';

describe('DashboardProgressCardComponent', () => {
  let component: DashboardProgressCardComponent;
  let fixture: ComponentFixture<DashboardProgressCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProgressCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProgressCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
