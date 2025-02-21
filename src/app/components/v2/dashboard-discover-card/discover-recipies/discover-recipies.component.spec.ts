import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverRecipiesComponent } from './discover-recipies.component';

describe('DiscoverRecipiesComponent', () => {
  let component: DiscoverRecipiesComponent;
  let fixture: ComponentFixture<DiscoverRecipiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoverRecipiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverRecipiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
