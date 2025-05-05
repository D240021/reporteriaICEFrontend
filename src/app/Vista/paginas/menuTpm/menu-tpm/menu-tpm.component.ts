import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CrearReporteComponent } from "../../crearReporte/crear-reporte/crear-reporte.component";
import { Usuario } from '../../../../Modelo/Usuario';
import { SeguridadService } from '../../../../Seguridad/Seguridad/seguridad.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../../componentes/dialogoConfirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { datosConfirmacionSesionSinGuardar } from '../../../../Modelo/DatosDialogoConfirmacion';
import { InformeService } from '../../../../Controlador/Informe/informe.service';
import { Informe } from '../../../../Modelo/Informe';
import { MatCardModule } from '@angular/material/card';
import { AnimacionCargaComponent } from "../../../componentes/animacionCarga/animacion-carga/animacion-carga.component";
import { MatIconModule } from '@angular/material/icon';
import { formatearFechaHora } from '../../../../Util/Formatos/fechas';
import { EditarReporteTPMComponent } from '../../editarReporteTPM/editar-reporte-tpm/editar-reporte-tpm.component';
import { CommonModule } from '@angular/common';
import { DialogoInformativoComponent } from '../../../componentes/dialogoInformativo/dialogo-informativo/dialogo-informativo.component';
import { datosInforme } from '../../../../Modelo/DatosDialogoInformativo';

@Component({
  selector: 'menu-tpm',
  standalone: true,
  imports: [MatTabsModule, CrearReporteComponent, MatButtonModule, MatCardModule, AnimacionCargaComponent, MatIconModule, EditarReporteTPMComponent,
    CommonModule
  ],
  templateUrl: './menu-tpm.component.html',
  styleUrl: './menu-tpm.component.css'
})
export class MenuTpmComponent implements OnInit {

  ngOnInit(): void {
    this.cargarInformacionGeneral();
  }


  public seguridadService = inject(SeguridadService);
  public usuarioIngresado !: Usuario;
  private cuadroDialogo = inject(MatDialog);
  private modalAbierto: boolean = false;
  private informeService = inject(InformeService);
  public informes: any[] = [];
  public mostrarEditar = false;
  public informeSeleccionado!: Informe;
  private dialogo = inject(MatDialog);
  private dialogoRef: any;

  cargarInformacionGeneral(): void {
    this.informes = [];
    this.usuarioIngresado = this.seguridadService.obtenerInformacionUsuarioLogeado();
    const subestacionId = this.usuarioIngresado.subestacionId || 0;
    this.informeService.obtenerInformesPendientesPorSubestacion(subestacionId).subscribe(informes => {
      this.informes = [...informes];
      this.informes.forEach(informe => {
        this.informeService.obtenerReportePorInformeId(informe.id).subscribe(reporte => {
          informe.reporteAsociado = reporte;
          informe.reporteAsociado.fechaHora = formatearFechaHora(informe.reporteAsociado.fechaHora);
        });
      });
    });
  }

  abrirCuadroDialogo(): void {

    if (!this.modalAbierto) {
      this.modalAbierto = true;
      const dialogRef = this.cuadroDialogo.open(DialogoConfirmacionComponent, {
        width: '400px',
        height: '200px',
        data: datosConfirmacionSesionSinGuardar
      });
      dialogRef.afterClosed().subscribe(result => {
        this.modalAbierto = false;
        if (result === 'Confirmacion') {
          this.cargarInformacionGeneral();
        }
      });
    }
  }


  abrirEditarInforme(informe: Informe): void {
    this.mostrarEditar = true;
    this.informeSeleccionado = informe;
  }

  cerrarEditar(): void {
    this.cargarInformacionGeneral();
    this.mostrarEditar = false;
  }


  abrirDialogoInformativo() {
    this.dialogoRef = this.dialogo.open(DialogoInformativoComponent, {
      position: { top: '10%', left: '10%' },
      data : datosInforme,
      disableClose: true,
      hasBackdrop: false,
    });
  }

  cerrarDialogoInformativo() {
    if (this.dialogoRef) {
      this.dialogoRef.close();
    }
  }


}
