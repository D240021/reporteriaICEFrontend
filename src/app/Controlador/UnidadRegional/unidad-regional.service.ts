import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ambiente } from '../../Ambientes/ambienteDesarrollo';
import { UnidadRegional } from '../../Modelo/unidadRegional';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadRegionalService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = ambiente.apiURL + '/UnidadRegional';

  public crearUnidadRegional(unidadRegional: UnidadRegional): Observable<any>{
    return this.http.post(this.urlBase, unidadRegional);
  }

  public obtenerUnidadesRegionales(){
    return this.http.get<UnidadRegional[]>(this.urlBase);
  }

  public editarUnidadRegional(unidadRegional : UnidadRegional){
    return this.http.put(`${this.urlBase}/${unidadRegional.id}`, unidadRegional);
  }
}
