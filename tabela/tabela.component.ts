import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../service/pais.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {
  paises: any[] = [];

  constructor(private service: PaisService){}
  
  ngOnInit(): void {
    this.service.getPaises().subscribe(data => {
      this.paises = data;
    })
  }
}
