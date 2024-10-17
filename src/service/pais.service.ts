import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from 'src/model/country';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  // Caminho endpoint back-end
  private url = 'http://localhost:8080/countries'; 

  constructor(private http: HttpClient) { }

  // Obtém países
  getPaises(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url);
  }
}
