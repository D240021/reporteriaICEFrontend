import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormulariosService } from '../../../../Util/Formularios/formularios.service';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../../Modelo/Usuario';
import { SeguridadService } from '../../../../Seguridad/Seguridad/seguridad.service';
import { Reporte } from '../../../../Modelo/Reporte';
import { AnimacionCargaComponent } from '../../../componentes/animacionCarga/animacion-carga/animacion-carga.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ReporteService } from '../../../../Controlador/Reporte/reporte.service';
import { DialogoConfirmacionComponent } from '../../../componentes/dialogoConfirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { datosConfirmacionIrreversible, datosConfirmacionSalidaFormulario } from '../../../../Modelo/DatosDialogoConfirmacion';

@Component({
  selector: 'editar-reporte-tlt',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './editar-reporte-tlt.component.html',
  styleUrls: ['./editar-reporte-tlt.component.css']
})
export class EditarReporteTLTComponent implements OnInit {

  public reporteATrabajar !: Reporte;

  ngOnInit(): void {

    this.reporteATrabajar = history.state.reporte;
    this.usuarioIngresado = this.seguridadService.obtenerInformacionUsuarioLogeado();
  
    this.contenedorFormulario.valueChanges.subscribe((valores) => {
      if (!this.contenedorFormulario.pristine && !this.accionesFormulario.esFormularioVacio(valores)) {
        this.formularioModificado = true;
      } else {
        this.formularioModificado = false;
      }

      if (this.accionesFormulario.esFormularioVacio(valores)) {
        this.contenedorFormulario.markAsPristine();
      }
    });

  }

  public mensajeErrorImagen: string = '';
  private router = inject(Router);
  private formularioModificado: boolean = false;
  private reporteService = inject(ReporteService);
  public arregloBytesImagenSeleccionada: number[] = [];
  private cuadroDialogo = inject(MatDialog);
  private modalAbierto: boolean = false;
  private formBuilder = inject(FormBuilder);
  public accionesFormulario = inject(FormulariosService);
  public usuarioIngresado !: Usuario;
  private seguridadService = inject(SeguridadService);
  public contenedorFormulario = this.formBuilder.group({
    evidencia: [''],
    causas: ['', { validators: [Validators.required] }],
    fechaHora: ['', { validators: [Validators.required] }],
    observaciones: ['']
  });

  
  convertirImagenArregloBytes(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (input.files.length > 1) {
        this.mensajeErrorImagen = 'Solo se permite subir un único archivo.';
        return; 
      }

      const formatosPermitidos = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

      if (!formatosPermitidos.includes(file.type)) {
        this.mensajeErrorImagen = 'El archivo debe ser una imagen válida (png, jpeg, jpg, gif).';
        return; 
      }

      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const bytes = new Uint8Array(arrayBuffer);
        this.arregloBytesImagenSeleccionada = Array.from(bytes);

        
        const binaryString = String.fromCharCode(...bytes);
        const base64String = btoa(binaryString);
        this.contenedorFormulario.controls['evidencia'].setValue(base64String);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  guardarCambios() : void {
    const reporteAEnviar: Reporte = {
      id: this.reporteATrabajar.id,
      mapaDeDescargas: this.reporteATrabajar.mapaDeDescargas,
      observaciones: this.reporteATrabajar.observaciones,
      evidencia: this.contenedorFormulario.value.evidencia,
      observacionesTecnicoLinea: this.contenedorFormulario.value.observaciones || '',
      causas: this.contenedorFormulario.value.causas || '',
      fechaHora: this.contenedorFormulario.value.fechaHora?.toString(),
      informeV1Id: this.reporteATrabajar.informeV1Id,
      informeV2Id: this.reporteATrabajar.informeV2Id,
      informeV3Id: this.reporteATrabajar.informeV3Id,
      informeV4Id: this.reporteATrabajar.informeV4Id,
      usuarioSupervisorId: this.reporteATrabajar.usuarioSupervisorId,
      tecnicoLineaId: this.reporteATrabajar.tecnicoLineaId,
      estado: this.reporteATrabajar.estado
    };
    this.reporteService.editarReporte(reporteAEnviar).subscribe(repuesta => {
      this.reporteService.emitirReporteGuardado();
    })
  }

  abrirCuadroDialogoConfirmacionGuardado(): void {

    const datoSalida = datosConfirmacionSalidaFormulario;
    datoSalida.titulo = 'Editar Reporte';
    datoSalida.tipo = 'formularioTLT';
    if (!this.modalAbierto) {
      this.modalAbierto = true;
      const dialogRef = this.cuadroDialogo.open(DialogoConfirmacionComponent, {
        width: '400px',
        height: '200px',
        data: datoSalida
      });
      dialogRef.afterClosed().subscribe(result => {
        this.modalAbierto = false;
        if (result === 'Confirmacion') {
          this.guardarCambios();
        }
      });
    }

  }

  abrirCuadroDialogoConfirmacionSalida(): void {

    const datoSalida = datosConfirmacionIrreversible;
    datoSalida.titulo = 'Editar Reporte';
    datoSalida.tipo = 'formularioTLT';
    if (!this.modalAbierto) {
      this.modalAbierto = true;
      const dialogRef = this.cuadroDialogo.open(DialogoConfirmacionComponent, {
        width: '400px',
        height: '200px',
        data: datoSalida
      });
      dialogRef.afterClosed().subscribe(result => {

      });
    }

  }

  verificarAbandonoFormulario() {
    if (this.formularioModificado) {
      this.abrirCuadroDialogoConfirmacionSalida();
    } else {
      this.router.navigate(['/menu-tlt']);
    }
  }



}

