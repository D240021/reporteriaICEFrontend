import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ambiente } from '../../Ambientes/ambienteDesarrollo';
import { LineaTransmision } from '../../Modelo/LineaTransmision';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineaTransmisionService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = ambiente.apiURL + '/LineaTransmision';

  public crearLineaTransmision(lineaTransmision: LineaTransmision): Observable<any>{
    return this.http.post(this.urlBase, lineaTransmision);
  }

  public obtenerLineasTransmision(){
    return this.http.get<LineaTransmision[]>(this.urlBase);
  }

  public editarLineaTransmision(lineaTransmision: LineaTransmision){
    return this.http.put(`${this.urlBase}/${lineaTransmision.id}`, lineaTransmision);
  }
}
