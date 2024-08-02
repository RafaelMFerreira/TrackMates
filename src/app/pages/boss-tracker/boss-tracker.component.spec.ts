import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BossTrackerComponent } from './boss-tracker.component';

describe('BossTrackerComponent', () => {
  let component: BossTrackerComponent;
  let fixture: ComponentFixture<BossTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BossTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BossTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
