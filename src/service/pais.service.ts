import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from 'src/model/country';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  // Caminho JSON
  private jsonURL = 'assets/data.json'; 

  constructor(private http: HttpClient) { }

  // Obtém países
  getPaises(): Observable<Country[]> {
    return this.http.get<Country[]>(this.jsonURL);
  }
}
