import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ambiente } from '../../Ambientes/ambienteDesarrollo';
import { Informe } from '../../Modelo/Informe';
import { Observable } from 'rxjs';
import { Reporte } from '../../Modelo/Reporte';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = ambiente.apiURL + '/Informe';

  public obtenerInformesPendientesPorSubestacion(idSubestacion: number): Observable<Informe[]> {
    return this.http.get<Informe[]>(`${this.urlBase}/pendientes/${idSubestacion}`);
  }

  public obtenerReportePorInformeId(idInforme: number): Observable<Reporte> {
    return this.http.get<Reporte>(`${this.urlBase}/reportePorInforme/${idInforme}`);
  }

  public editarInforme(informe : Informe){
    return this.http.put(`${this.urlBase}/${informe.id}`, informe);
  }
  
}
