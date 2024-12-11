import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogFoodComponent } from './log-food.component';

describe('LogFoodComponent', () => {
  let component: LogFoodComponent;
  let fixture: ComponentFixture<LogFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
