import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from '../../../../Seguridad/Seguridad/seguridad.service';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../../../Modelo/Usuario';
import { Reporte } from '../../../../Modelo/Reporte';
import { ReporteService } from '../../../../Controlador/Reporte/reporte.service';
import { DialogoConfirmacionComponent } from '../../../componentes/dialogoConfirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { datosCerrarSesion } from '../../../../Modelo/DatosDialogoConfirmacion';
import { AnimacionCargaComponent } from '../../../componentes/animacionCarga/animacion-carga/animacion-carga.component';
import { formatearFechaHora } from '../../../../Util/Formatos/fechas';
import { UsuarioService } from '../../../../Controlador/Usuario/usuario.service';

@Component({
  selector: 'menu-tlt',
  standalone: true,
  imports: [AnimacionCargaComponent],
  templateUrl: './menu-tlt.component.html',
  styleUrl: './menu-tlt.component.css'
})
export class MenuTltComponent implements OnInit {

  constructor() {
    this.reporteService.reporteGuardado.subscribe(() => {
      this.cargarInformacionGeneral();
    });
  }

  ngOnInit(): void {
    this.cargarInformacionGeneral();
  }


  private router = inject(Router);
  public seguridadService = inject(SeguridadService);
  private modalAbierto: boolean = false;
  private cuadroDialogo = inject(MatDialog);
  public usuarioIngresado !: Usuario;
  public reportesTodos: Reporte[] = [];
  public reportesPendientes: Reporte[] = [];
  private reporteService = inject(ReporteService);
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
    this.router.navigate(['/editar-reporte-tlt'], { state: { reporte: reporte } });
  }

  obtenerReportesPendientes(): void {
    this.reportesPendientes = [];
    this.reportesTodos.forEach(reporte => {
      if (reporte.estado === 3 && this.usuarioIngresado.id === reporte.tecnicoLineaId) {
        this.reportesPendientes.push(reporte);
      }
    });
  }

  cargarInformacionGeneral(): void {
    this.reportesTodos = [];
    this.usuarioIngresado = this.seguridadService.obtenerInformacionUsuarioLogeado();
    this.reporteService.obtenerTodosReportes().subscribe(respuesta => {
      this.reportesTodos = respuesta;
      this.reportesTodos.forEach(reporte => {
        if (reporte.fechaHora) {
          reporte.fechaFormateada = formatearFechaHora(reporte.fechaHora.toString());
        }
        this.usuarioService.obtenerUsuarioPorId(reporte.usuarioSupervisorId).subscribe(respuesta => {
          const usuarioSupervisor = respuesta as Usuario;
          reporte.nombreSupervisor = usuarioSupervisor.nombre + ' ' + usuarioSupervisor.apellido;
        });

      });
      this.obtenerReportesPendientes();
    });
  }

  abrirConsultarReporte(reportes: Reporte[], tipo: string): void {

    this.router.navigate(['/consultar-reporte'], { state: { reportes: reportes, tipo: tipo } });
  }
}
