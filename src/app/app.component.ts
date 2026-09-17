import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PivotTableComponent } from 'ngx-modern-pivot-table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PivotTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rows: string[] = ['Region', 'Category'];
  cols: string[] = ['Quarter'];
  vals: string[] = ['Revenue'];
  aggregator = 'Sum';

  data: any[] = this.generateSalesData();

  private generateSalesData(): any[] {
    const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America'];
    const categories = ['Cloud Enterprise', 'Hardware & Servers', 'Smart Devices', 'Consulting & Support'];
    const quarters = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026'];
    const salesReps = ['Sarah Jenkins', 'Alex Rivera', 'Kenji Sato', 'Elena Rostova'];

    const records: any[] = [];
    for (const region of regions) {
      for (const category of categories) {
        for (const quarter of quarters) {
          const rep = salesReps[Math.floor(Math.random() * salesReps.length)];
          const units = Math.floor(Math.random() * 350) + 50;
          const basePrice = category === 'Cloud Enterprise' ? 1400 : category === 'Hardware & Servers' ? 950 : category === 'Smart Devices' ? 550 : 300;
          const revenue = units * basePrice;
          const profit = Math.floor(revenue * (0.22 + Math.random() * 0.18));

          records.push({
            Region: region,
            Category: category,
            Quarter: quarter,
            SalesRep: rep,
            UnitsSold: units,
            Revenue: revenue,
            Profit: profit
          });
        }
      }
    }
    return records;
  }
}
