import { Component } from '@angular/core';

@Component({
  selector: 'app-promotion-bonus',
  templateUrl: './promotion-bonus.component.html',
  styleUrls: ['./promotion-bonus.component.scss']
})
export class PromotionBonusComponent {
   ranks = [
    { rank: 'Nova Star', teamBusiness: 1500, earnBonus: 0 },
    { rank: 'Lustre Pearl', teamBusiness: 3000, earnBonus: 0 },
    { rank: 'Core Bronze', teamBusiness: 6000, earnBonus: 0 },
    { rank: 'Crystal Quartz', teamBusiness: 12000, earnBonus: 0 },
    { rank: 'Prime Emerald', teamBusiness: 30000, earnBonus: 0 },
    { rank: 'Flame Ruby', teamBusiness: 60000, earnBonus: 0 },
    { rank: 'Pure Silver', teamBusiness: 120000, earnBonus: 0 },
    { rank: 'Royal Gold', teamBusiness: 300000, earnBonus: 0 },
    { rank: 'Ultra Platinum', teamBusiness: 600000, earnBonus: 0 },
    { rank: 'Eternal Diamond', teamBusiness: 1200000, earnBonus: 0 }
  ];

}
