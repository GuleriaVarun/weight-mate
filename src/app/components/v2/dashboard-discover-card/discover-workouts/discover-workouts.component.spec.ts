import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverWorkoutsComponent } from './discover-workouts.component';

describe('DiscoverWorkoutsComponent', () => {
  let component: DiscoverWorkoutsComponent;
  let fixture: ComponentFixture<DiscoverWorkoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoverWorkoutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverWorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
