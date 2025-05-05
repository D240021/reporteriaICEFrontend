import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CorrientesDeFallaInforme, DatosDeLineaInforme, DatosGeneralesInforme, DistanciaFallaInforme, Informe, TeleproteccionInforme, TiemposDeDisparoInforme } from '../../../../Modelo/Informe';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormulariosService } from '../../../../Util/Formularios/formularios.service';
import { SubestacionService } from '../../../../Controlador/Subestacion/subestacion.service';
import { Usuario } from '../../../../Modelo/Usuario';
import { SeguridadService } from '../../../../Seguridad/Seguridad/seguridad.service';
import { Subestacion } from '../../../../Modelo/subestacion';
import { AnimacionCargaComponent } from '../../../componentes/animacionCarga/animacion-carga/animacion-carga.component';
import { Reporte } from '../../../../Modelo/Reporte';
import { InformeService } from '../../../../Controlador/Informe/informe.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../../componentes/dialogoConfirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { DatosConfirmacion, datosConfirmacionIrreversible, datosConfirmacionSalidaFormulario } from '../../../../Modelo/DatosDialogoConfirmacion';

@Component({
  selector: 'editar-reporte-tpm',
  standalone: true,
  imports: [AnimacionCargaComponent, ReactiveFormsModule],
  templateUrl: './editar-reporte-tpm.component.html',
  styleUrl: './editar-reporte-tpm.component.css'
})
export class EditarReporteTPMComponent implements OnInit {

  @Input()
  public informeATrabajar !: Informe;

  @Output()
  private cerrarComponente = new EventEmitter<void>();

  public subestacionAsociada !: Subestacion | null;
  public reporteAsociado !: Reporte;



  ngOnInit(): void {
    this.usuarioIngresado = this.seguridadService.obtenerInformacionUsuarioLogeado();

    this.subestacionAsociadaId = this.usuarioIngresado.subestacionId || 0;

    this.subestacionService.obtenerSubestacionPorId(this.subestacionAsociadaId).subscribe(subestacion => {
      this.subestacionAsociada = subestacion;
    });


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
  private subestacionAsociadaId !: number;
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  public accionesFormulario = inject(FormulariosService);
  private subestacionService = inject(SubestacionService);
  public usuarioIngresado !: Usuario;
  private seguridadService = inject(SeguridadService);
  private informeService = inject(InformeService);
  private modalAbierto: boolean = false;
  private cuadroDialogo = inject(MatDialog);
  private formularioModificado: boolean = false;
  public contenedorFormulario = this.formBuilder.group({
    id: [''],
    tipo: [''],
    evento: [''],
    fecha: [''],
    hora: [''],
    subestacion: [''],
    lt: [''],
    equipo: [''],
    ot: [''],
    aviso: [''],
    sap: [''],
    distancia: [''],
    funcion: [''],
    zona: [''],
    realR: [''],
    realS: [''],
    realT: [''],
    acumuladaR: [''],
    acumuladaS: [''],
    acumuladaT: [''],
    r: [''],
    s: [''],
    t: [''],
    reserva: [''],
    distanciaKm: [''],
    distanciaPor: [''],
    distanciaReportada: [''],
    distanciaDobleTemporal: [''],
    error: [''],
    errorDoble: [''],
    txTel: [''],
    rxTel: [''],
    tiempoMpls: [''],
  });

  construirObjetoInforme(): Informe {

    const tipoValor = this.informeATrabajar.tipo || 0;
    const lineaTransmisionId = this.informeATrabajar.lineaTransmisionId || 0;
    const datosDelineaId = this.informeATrabajar.datosDeLineaId || 0;
    const datosGeneralesId = this.informeATrabajar.datosGeneralesId || 0;
    const fechaISO = this.contenedorFormulario.value.fecha ? new Date(this.contenedorFormulario.value.fecha) : new Date();
    const teleproteccionId = this.informeATrabajar.teleproteccionId || 0;
    const distanciaDeFallaId = this.informeATrabajar.distanciaDeFallaId || 0;
    const tiemposDeDisparoId = this.informeATrabajar.tiemposDeDisparoId || 0;
    const corrientesDeFallaId = this.informeATrabajar.corrientesDeFallaId || 0;


    const datosDeLineaObjeto: DatosDeLineaInforme = {
      id: datosDelineaId,
      ot: this.contenedorFormulario.value.ot || '',
      aviso: this.contenedorFormulario.value.aviso || '',
      sap: this.contenedorFormulario.value.sap || '',
      distancia: this.contenedorFormulario.value.distancia || '',
      funcion: this.contenedorFormulario.value.funcion || '',
      zona: this.contenedorFormulario.value.zona || '',
    }

    const datosGeneralesObjeto: DatosGeneralesInforme = {
      id: datosGeneralesId,
      evento: this.contenedorFormulario.value.evento || '',
      fecha: fechaISO.toISOString(),
      hora: this.contenedorFormulario.value.hora + ':00' || '00:00:00',
      subestacion: this.contenedorFormulario.value.subestacion || '',
      lt: this.contenedorFormulario.value.lt || '',
      equipo: this.contenedorFormulario.value.equipo || ''
    }

    datosGeneralesObjeto.hora === ':00' ? datosGeneralesObjeto.hora = '00:00:00' : undefined;
    const teleproteccionObjeto: TeleproteccionInforme = {
      id: teleproteccionId,
      tX_TEL: this.contenedorFormulario.value.txTel || '',
      rX_TEL: this.contenedorFormulario.value.rxTel || '',
      tiempoMPLS: this.contenedorFormulario.value.tiempoMpls || ''
    }

    const distanciaFallaObjeto: DistanciaFallaInforme = {
      id: distanciaDeFallaId,
      distanciaKM: this.contenedorFormulario.value.distanciaKm || '',
      distanciaPorcentaje: this.contenedorFormulario.value.distanciaPor || '',
      distanciaReportada: this.contenedorFormulario.value.distanciaReportada || '',
      distanciaDobleTemporal: this.contenedorFormulario.value.distanciaDobleTemporal || '',
      error: this.contenedorFormulario.value.error || '',
      error_Doble: this.contenedorFormulario.value.errorDoble || '',
    }

    const tiempoDeDisparoObjeto: TiemposDeDisparoInforme = {
      id: tiemposDeDisparoId,
      r: this.contenedorFormulario.value.r || '',
      s: this.contenedorFormulario.value.s || '',
      t: this.contenedorFormulario.value.t || '',
      reserva: this.contenedorFormulario.value.reserva || ''
    }

    const corrientesDeFallaObjeto: CorrientesDeFallaInforme = {
      id: corrientesDeFallaId,
      realIR: this.contenedorFormulario.value.realR || '',
      realIS: this.contenedorFormulario.value.realS || '',
      realIT: this.contenedorFormulario.value.realT || '',
      acumuladaR: this.contenedorFormulario.value.acumuladaR || '',
      acumuladaS: this.contenedorFormulario.value.acumuladaS || '',
      acumuladaT: this.contenedorFormulario.value.acumuladaT || ''
    }

    const informeResultado: Informe = {
      id: this.informeATrabajar.id,
      tipo: tipoValor,
      subestacionId: this.subestacionAsociadaId,
      lineaTransmisionId: lineaTransmisionId,
      datosDeLineaId: datosDelineaId,
      datosDeLinea: datosDeLineaObjeto,
      datosGeneralesId: datosGeneralesId,
      datosGenerales: datosGeneralesObjeto,
      teleproteccionId: teleproteccionId,
      teleproteccion: teleproteccionObjeto,
      distanciaDeFallaId: distanciaDeFallaId,
      distanciaDeFalla: distanciaFallaObjeto,
      tiemposDeDisparoId: tiemposDeDisparoId,
      tiemposDeDisparo: tiempoDeDisparoObjeto,
      corrientesDeFallaId: corrientesDeFallaId,
      corrientesDeFalla: corrientesDeFallaObjeto,
      estado: 1
    }

    return informeResultado;
  }

  guardarCambios(): void {

    const informeAEditar: Informe = this.construirObjetoInforme();
    this.informeService.editarInforme(informeAEditar).subscribe(respuesta => {
      this.cerrarComponente.emit();
    });

  }

  abrirCuadroDialogoConfirmacionGuardado(): void {


    if (!this.modalAbierto) {
      this.modalAbierto = true;
      const dialogRef = this.cuadroDialogo.open(DialogoConfirmacionComponent, {
        width: '400px',
        height: '200px',
        data: datosConfirmacionIrreversible
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

    const datosSalida : DatosConfirmacion = datosConfirmacionSalidaFormulario;
    datosSalida.tipo = ''
    if (!this.modalAbierto) {
      this.modalAbierto = true;
      const dialogRef = this.cuadroDialogo.open(DialogoConfirmacionComponent, {
        width: '400px',
        height: '200px',
        data: datosSalida
      });
      dialogRef.afterClosed().subscribe(result => {
        this.cerrarComponente.emit();
      });
    }

  }

  verificarAbandonoFormulario() {
    if (this.formularioModificado) {
      this.abrirCuadroDialogoConfirmacionSalida();
    } else {
      this.cerrarComponente.emit();
    }
  }


}
