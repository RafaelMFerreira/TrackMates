import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-slider',
  templateUrl: './custom-slider.component.html',
  styleUrls: ['./custom-slider.component.css']
})
export class CustomSliderComponent {
  startLevel: number = 0;
  endLevel: number = 10;  // Setting initial higher than start to prevent overlap initially
  isSliding: string = '';
  startZIndex: number = 1;
  endZIndex: number = 2;

  onSliderChange() {
    if (this.startLevel >= this.endLevel) {
      if (this.isSliding === 'start') {
        this.endLevel = this.startLevel + 1;
      } else if (this.isSliding === 'end') {
        this.startLevel = this.endLevel - 1;
      }
      // Ensure values stay within bounds
      if (this.endLevel > 70) {
        this.endLevel = 70;
        this.startLevel = 69;
      }
      if (this.startLevel < 0) {
        this.startLevel = 0;
        this.endLevel = 1;
      }
    }
  }

  startSliding(slider: string) {
    this.isSliding = 'start';
    this.adjustZIndex(slider);
  }

  stopSliding() {
    this.isSliding = 'end';
    this.onSliderChange();  // Validate on stop to adjust if needed
  }

  adjustZIndex(slider: string) {
    this.startZIndex = (slider === 'start' ? 3 : 2);
    this.endZIndex = (slider === 'start' ? 2 : 3);
  }
}
