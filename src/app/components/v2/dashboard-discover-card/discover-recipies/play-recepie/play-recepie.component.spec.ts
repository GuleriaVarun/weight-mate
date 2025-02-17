import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayRecepieComponent } from './play-recepie.component';

describe('PlayRecepieComponent', () => {
  let component: PlayRecepieComponent;
  let fixture: ComponentFixture<PlayRecepieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayRecepieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayRecepieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
