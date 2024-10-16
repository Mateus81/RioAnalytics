import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PaisService } from '../../service/pais.service';
import { Country } from 'src/model/country';
import { ChartData, ChartOptions, Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  chart!: Chart;
  chartData!: ChartData<'bar'>; // "!" para informar que valores serão enviados mais tarde 
  chartOptions!: ChartOptions<'bar'>;

  constructor(private service: PaisService){
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.service.getPaises().subscribe((data: Country[]) => {
      const regions = data.reduce((acc: {[key: string]: number}, pais: Country) => {
        const region = pais.region;
        acc[region] = (acc[region] || 0) + pais.population;
        return acc;
      }, {});
      this.chartData = {
        labels: Object.keys(regions),
        datasets: [{
          label: "População por região",
          data: Object.values(regions),
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      };
      this.chartOptions = {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
      this.createChart();
    });
  }

  createChart(): void {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: this.chartData,
      options: this.chartOptions
    })
  }
}
