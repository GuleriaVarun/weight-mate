import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionCardComponent } from './nutrition-card.component';

describe('NutritionCardComponent', () => {
  let component: NutritionCardComponent;
  let fixture: ComponentFixture<NutritionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
