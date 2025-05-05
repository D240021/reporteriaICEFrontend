import { Component, inject, OnInit } from '@angular/core';
import { BuscadorComponent } from '../../../componentes/buscador/buscador/buscador.component';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormulariosService } from '../../../../Util/Formularios/formularios.service';
import { ReporteService } from '../../../../Controlador/Reporte/reporte.service';
import { Reporte } from '../../../../Modelo/Reporte';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../../componentes/dialogoConfirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { datosConfirmacionIrreversible, datosConfirmacionSalidaFormulario } from '../../../../Modelo/DatosDialogoConfirmacion';
import { convertirStringAFormatoISO, formatearFechaHora } from '../../../../Util/Formatos/fechas';

@Component({
  selector: 'editar-reporte',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-reporte.component.html',
  styleUrls: ['./editar-reporte.component.css']
})
export class EditarReporteComponent implements OnInit {

  public reporteATrabajar !: Reporte;

  ngOnInit(): void {
    this.reporteATrabajar = history.state.reporte;

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
  private formBuilder = inject(FormBuilder);
  private reporteService = inject(ReporteService);
  public accionesFormulario = inject(FormulariosService);
  public arregloBytesImagenSeleccionada: number[] = [];
  private modalAbierto: boolean = false;
  private cuadroDialogo = inject(MatDialog);
  private formularioModificado: boolean = false;
  private router = inject(Router);
  public contenedorFormulario = this.formBuilder.group({
    mapaDescargas: [''],
    observaciones: ['', { validators: [Validators.required, Validators.minLength(5)] }]
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

      this.mensajeErrorImagen = '';

      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const bytes = new Uint8Array(arrayBuffer);
        this.arregloBytesImagenSeleccionada = Array.from(bytes);


        const binaryString = String.fromCharCode(...bytes);
        const base64String = btoa(binaryString);
        this.contenedorFormulario.controls['mapaDescargas'].setValue(base64String);
      };
      reader.readAsArrayBuffer(file);
    }
  }
  guardarCambios(): void {


    const reporteAEnviar: Reporte = {
      id: this.reporteATrabajar.id,
      mapaDeDescargas: this.contenedorFormulario.value.mapaDescargas,
      observaciones: this.contenedorFormulario.value.observaciones || '',
      evidencia: this.reporteATrabajar.evidencia,
      observacionesTecnicoLinea: this.reporteATrabajar.observacionesTecnicoLinea,
      causas: this.reporteATrabajar.causas,
      fechaHora: this.reporteATrabajar.fechaHora,
      informeV1Id: this.reporteATrabajar.informeV1Id,
      informeV2Id: this.reporteATrabajar.informeV2Id,
      informeV3Id: this.reporteATrabajar.informeV3Id,
      informeV4Id: this.reporteATrabajar.informeV4Id,
      usuarioSupervisorId: this.reporteATrabajar.usuarioSupervisorId,
      tecnicoLineaId: this.reporteATrabajar.tecnicoLineaId,
      estado: this.reporteATrabajar.estado
    };

    this.reporteService.editarReporte(reporteAEnviar).subscribe(respuesta => {
      this.reporteService.emitirReporteGuardado();
    });
  }


  abrirCuadroDialogoConfirmacionGuardado(): void {

    const datoSalida = datosConfirmacionIrreversible;
    datoSalida.tipo = 'formularioSprv';
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

    const datoSalida = datosConfirmacionSalidaFormulario;
    datoSalida.tipo = 'formularioSprv';
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
      this.router.navigate(['/menu-supervisor']);
    }
  }


}
