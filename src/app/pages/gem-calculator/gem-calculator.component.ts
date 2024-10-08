// gem-calculator.component.ts
import { Component } from '@angular/core';
import { CustomSliderComponent } from '../../components/custom-slider/custom-slider.component';

@Component({
  selector: 'app-gem-calculator',
  templateUrl: './gem-calculator.component.html',
  styleUrls: ['./gem-calculator.component.css']
})
export class GemCalculatorComponent {
  startLevel: number = 1;
  endLevel: number = 70;
  stones = [
    { name: 'Emeralds', amount: 0, value: 48, bonusValue: 166, bonusThreshold: 16, icon: 'assets/emerald.png' },
    { name: 'Rubies', amount: 0, value: 74, bonusValue: 168, bonusThreshold: 16, icon: 'assets/ruby.png' },
    { name: 'Sapphires', amount: 0, value: 122, bonusValue: 170, bonusThreshold: 16, icon: 'assets/sapphire.png' },
    { name: 'Diamonds', amount: 0, value: 246, bonusValue: 172, bonusThreshold: 16, icon: 'assets/diamond.png' },
    { name: 'Gold', amount: 0, value: 0, bonusValue: 33, bonusThreshold: 16, icon: 'assets/gold.png'},
    { name: 'Silver', amount: 0, value: 0, bonusValue: 25, bonusThreshold: 16, icon: 'assets/silver.png'},
  ];
  xpNeeded: number = 0; // Initialize XP needed variable

  constructor() {
    this.calculateTotalXp();
  }

  calculateTotalXp() {
    this.xpNeeded = 0;
    for (let level = this.startLevel + 1; level <= this.endLevel; level++) {
      this.xpNeeded += this.calculateXp(level);
    }
  }

  calculateXp(x: number): number {
    return Math.floor((0.04 * Math.pow(x, 3) + 0.8 * Math.pow(x, 2) + 2 * x + 50 * x));
  }

  get totalValue() {
    return this.stones.reduce((total, stone) => {
      const baseValue = stone.amount * stone.value;
      const bonus = Math.floor(stone.amount / stone.bonusThreshold) * stone.bonusValue;
      return total + baseValue + bonus;
    }, 0);
  }
}
