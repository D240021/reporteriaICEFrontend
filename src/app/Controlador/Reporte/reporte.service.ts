import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { ambiente } from '../../Ambientes/ambienteDesarrollo';
import { Reporte } from '../../Modelo/Reporte';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = ambiente.apiURL + '/Reporte';
  public reporteGuardado = new EventEmitter<void>();


  public crearReporte(reporte: Reporte, subestacionesId: number[], lineaTransmisionId: number): Observable<any> {
    let parametros = new HttpParams()
      .set('lineaTransmisionId', lineaTransmisionId.toString());


    subestacionesId.forEach(id => {
      parametros = parametros.append('subestacionIds', id.toString());
    });

    return this.http.post(this.urlBase, reporte, { params: parametros });
  }

  public obtenerTodosReportes(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(this.urlBase);
  }

  public editarReporte(reporte: Reporte) {
    return this.http.put(`${this.urlBase}/${reporte.id}`, reporte);
  }

  public obtenerPDFPorReporte(reporteId: number) {
    return this.http.get(`${this.urlBase}/${reporteId}/pdf`, { responseType: 'blob' });
  }

  public descargarPDF(reporteId: number): void {
    this.obtenerPDFPorReporte(reporteId).subscribe(
      respuesta => {
        const blob = new Blob([respuesta], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte_${reporteId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error al descargar el PDF:', error);
      }
    );
  }

  public emitirReporteGuardado(): void {
    this.reporteGuardado.emit();
  }
}
