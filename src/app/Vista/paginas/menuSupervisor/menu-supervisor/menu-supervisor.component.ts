import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeguridadService } from '../../../../Seguridad/Seguridad/seguridad.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../../componentes/dialogoConfirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { datosCerrarSesion } from '../../../../Modelo/DatosDialogoConfirmacion';
import { Usuario } from '../../../../Modelo/Usuario';
import { ReporteService } from '../../../../Controlador/Reporte/reporte.service';
import { Reporte } from '../../../../Modelo/Reporte';
import { AnimacionCargaComponent } from '../../../componentes/animacionCarga/animacion-carga/animacion-carga.component';
import { MatIcon } from '@angular/material/icon';
import { UsuarioService } from '../../../../Controlador/Usuario/usuario.service';
import { formatearFechaHora } from '../../../../Util/Formatos/fechas';

@Component({
  selector: 'menu-supervisor',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, AnimacionCargaComponent, MatIcon],
  templateUrl: './menu-supervisor.component.html',
  styleUrls: ['./menu-supervisor.component.css']
})
export class MenuSupervisorComponent implements OnInit {

  constructor(){
    this.reporteService.reporteGuardado.subscribe(() => {
      this.obtenerInformacionGeneral();
    });
  }

  ngOnInit(): void {
    this.obtenerInformacionGeneral();
  }


  private router = inject(Router);
  public seguridadService = inject(SeguridadService);
  private modalAbierto: boolean = false;
  private cuadroDialogo = inject(MatDialog);
  public usuarioIngresado !: Usuario;
  public reportesTodos: Reporte[] = [];
  public reportesPendientes: Reporte[] = [];
  public reporteService = inject(ReporteService);
  public reportesPasados: Reporte[] = [];
  private usuarioService = inject(UsuarioService);


  abrirCuadroDialogo(): void {

    if (!this.modalAbierto) {
      this.modalAbierto = true;
      const dialogRef = this.cuadroDialogo.open(DialogoConfirmacionComponent, {
        width: '400px',
        height: '200px',
        data: datosCerrarSesion
      });
      dialogRef.afterClosed().subscribe(result => {
        this.modalAbierto = false;
      });
    }

  }

  redirigirEdicionReporte(reporte: Reporte): void {
    this.router.navigate(['/editar-reporte'], { state: { reporte: reporte } });
  }

  obtenerReportesPendientes(): void {
    this.reportesPendientes = [];
    this.reportesTodos.forEach(reporte => {
      if (reporte.estado === 2 && this.usuarioIngresado.id === reporte.usuarioSupervisorId) {
        this.reportesPendientes.push(reporte);
      }
    });
  }

  obtenerReportesPasados(): void {
    this.reportesPasados = [];
    this.reportesTodos.forEach(reporte => {
      if (reporte.estado === 4 && this.usuarioIngresado.id === reporte.usuarioSupervisorId) {
        this.reportesPasados.push(reporte);
      }
    });
  }


  abrirConsultarReporte(reportes: Reporte[], tipo: string): void {

    this.router.navigate(['/consultar-reporte'], { state: { reportes: reportes, tipo: tipo } });
  }

  obtenerInformacionGeneral(): void {
    this.reportesTodos = [];
    this.usuarioIngresado = this.seguridadService.obtenerInformacionUsuarioLogeado();
    this.reporteService.obtenerTodosReportes().subscribe(respuesta => {
      this.reportesTodos = respuesta;
      this.reportesTodos.forEach(reporte => {
        if (reporte.fechaHora) {
          reporte.fechaFormateada = formatearFechaHora(reporte.fechaHora.toString());
        }
        this.usuarioService.obtenerUsuarioPorId(reporte.tecnicoLineaId).subscribe(respuesta => {
          const usuarioTecnicoLinea = respuesta as Usuario;
          reporte.nombreTecnicoLinea = usuarioTecnicoLinea.nombre + ' ' + usuarioTecnicoLinea.apellido;
        });

      });

      this.obtenerReportesPendientes();
      this.obtenerReportesPasados();

    });
  }

}
