import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GemCalculatorComponent } from './gem-calculator.component';

describe('GemCalculatorComponent', () => {
  let component: GemCalculatorComponent;
  let fixture: ComponentFixture<GemCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GemCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GemCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
