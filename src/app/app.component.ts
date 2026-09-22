import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PivotTableComponent } from 'ngx-modern-pivot-table';

export interface DatasetPreset {
  id: string;
  name: string;
  count: number;
  badge: string;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, PivotTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // Pivot Table Initial Configuration
  rows: string[] = ['Region', 'Category'];
  cols: string[] = ['Quarter'];
  vals: string[] = ['Revenue'];
  aggregator = 'Sum';
  theme: 'modern' | 'dark' | 'compact' | 'default' = 'modern';
  pageSize = 50;

  // Dataset Presets
  presets: DatasetPreset[] = [
    { id: '50k', name: '50,000 Records', count: 50000, badge: '🚀 Big Data (50k)', description: 'Stress-test zero-lag drag & drop with 50,000 rows' },
    { id: '10k', name: '10,000 Records', count: 10000, badge: '⚡ Enterprise (10k)', description: 'Real-world large enterprise global sales dataset' },
    { id: '1k', name: '1,000 Records', count: 1000, badge: '📊 Mid-Market (1k)', description: 'Fast product analytics dataset' },
    { id: '100', name: '100 Records', count: 100, badge: '💼 Sample (100)', description: 'Quick starter sales dataset' }
  ];

  selectedPresetId = '10k';
  data: any[] = [];
  recordsCount = 0;
  computeTimeMs: number | null = null;

  ngOnInit(): void {
    this.loadDataset(this.selectedPresetId);
  }

  public selectPreset(presetId: string): void {
    this.selectedPresetId = presetId;
    this.loadDataset(presetId);
  }

  public onPivotReady(result: any): void {
    if (result) {
      this.recordsCount = result.recordsProcessed;
    }
  }

  public onConfigChange(config: any): void {
    this.rows = config.rows || [];
    this.cols = config.cols || [];
    this.vals = config.vals || [];
    this.aggregator = config.aggregatorName || 'Sum';
  }

  private loadDataset(presetId: string): void {
    const preset = this.presets.find(p => p.id === presetId) || this.presets[1];
    const t0 = performance.now();
    this.data = this.generateEnterpriseDataset(preset.count);
    this.recordsCount = this.data.length;
    this.computeTimeMs = Math.round(performance.now() - t0);
  }

  private generateEnterpriseDataset(count: number): any[] {
    const regions = [
      { name: 'North America', countries: ['United States', 'Canada', 'Mexico'] },
      { name: 'Europe', countries: ['Germany', 'United Kingdom', 'France', 'Netherlands'] },
      { name: 'Asia Pacific', countries: ['Japan', 'Australia', 'Singapore', 'India'] },
      { name: 'Latin America', countries: ['Brazil', 'Chile', 'Colombia'] },
      { name: 'Middle East', countries: ['UAE', 'Saudi Arabia', 'Qatar'] }
    ];

    const categoryMap: Record<string, string[]> = {
      'Cloud Enterprise': ['Enterprise Storage', 'AI Analytics Cloud', 'Kubernetes Platform', 'Serverless Compute'],
      'Cybersecurity': ['Zero Trust Network', 'Threat Defense Suite', 'Cloud IAM', 'Endpoint Security'],
      'Hardware & Servers': ['AI GPU Clusters', 'Edge Compute Nodes', 'Rackmount Servers', 'SAN Storage Units'],
      'Smart Devices': ['Industrial IoT Sensors', 'Smart Office Hubs', 'Edge Cameras', 'Asset Trackers'],
      'Consulting & Support': ['Cloud Architecture Migration', '24/7 Managed SOC', 'DevOps Advisory', 'SLA Enterprise Support']
    };

    const categories = Object.keys(categoryMap);
    const segments = ['Enterprise', 'Mid-Market', 'SMB', 'Public Sector', 'Strategic Accounts'];
    const quarters = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const years = ['2025', '2026'];
    const salesReps = ['Sarah Jenkins', 'Alex Rivera', 'Kenji Sato', 'Elena Rostova', 'Marcus Vance', 'Priya Sharma', 'David Kim', 'Lucas Silva'];
    const paymentModes = ['Wire Transfer', 'Corporate Credit', 'Purchase Order', 'Cloud Credits'];
    const orderStatuses = ['Delivered', 'Completed', 'Processing', 'In Transit'];

    const records: any[] = new Array(count);

    for (let i = 0; i < count; i++) {
      const regionObj = regions[i % regions.length];
      const country = regionObj.countries[(i * 3) % regionObj.countries.length];
      const category = categories[(i >> 2) % categories.length];
      const subCatList = categoryMap[category];
      const subCategory = subCatList[(i * 5) % subCatList.length];
      const segment = segments[(i * 2) % segments.length];
      const quarter = quarters[i % quarters.length];
      const month = months[(i * 2) % months.length];
      const year = years[i % years.length];
      const rep = salesReps[(i * 7) % salesReps.length];
      const paymentMode = paymentModes[i % paymentModes.length];
      const status = orderStatuses[i % orderStatuses.length];

      const units = ((i * 17) % 450) + 25;
      const baseRate = category === 'Cloud Enterprise' ? 1800 :
                       category === 'Cybersecurity' ? 1400 :
                       category === 'Hardware & Servers' ? 2400 :
                       category === 'Smart Devices' ? 450 : 850;

      const revenue = units * baseRate + ((i * 131) % 2500);
      const profitMargin = 0.20 + ((i % 15) / 100);
      const profit = Math.round(revenue * profitMargin);
      const discount = (i % 5) * 5;
      const shippingCost = 50 + ((i * 23) % 450);

      records[i] = {
        Region: regionObj.name,
        Country: country,
        Category: category,
        SubCategory: subCategory,
        CustomerSegment: segment,
        Quarter: quarter,
        Month: month,
        Year: year,
        SalesRep: rep,
        PaymentMode: paymentMode,
        OrderStatus: status,
        UnitsSold: units,
        Revenue: revenue,
        Profit: profit,
        DiscountPct: discount,
        ShippingCost: shippingCost
      };
    }

    return records;
  }
}
