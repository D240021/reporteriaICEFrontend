import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ValidacionesService } from '../../../../Util/Validaciones/validaciones.service';
import { FormulariosService } from '../../../../Util/Formularios/formularios.service';
import { SubestacionService } from '../../../../Controlador/Subestacion/subestacion.service';
import { Subestacion } from '../../../../Modelo/subestacion';
import { UnidadRegionalService } from '../../../../Controlador/UnidadRegional/unidad-regional.service';
import { UnidadRegional } from '../../../../Modelo/unidadRegional';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../../componentes/dialogoConfirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { datosConfirmacionSalidaFormulario } from '../../../../Modelo/DatosDialogoConfirmacion';
import { CommonModule } from '@angular/common';
import { AnimacionCargaComponent } from '../../../componentes/animacionCarga/animacion-carga/animacion-carga.component';

@Component({
  selector: 'agregar-subestacion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AnimacionCargaComponent],
  templateUrl: './agregar-subestacion.component.html',
  styleUrl: './agregar-subestacion.component.css'
})
export class AgregarSubestacionComponent implements OnInit {

  ngOnInit(): void {

    this.unidadRegionalService.obtenerUnidadesRegionales().subscribe(unidadesRegionales => {
      this.unidadesRegionales = unidadesRegionales;
    });

    this.contenedorFormulario.valueChanges.subscribe((valores) => {
      if (!this.contenedorFormulario.pristine && !this.accionesFormulario.esFormularioVacio(valores)) {
        this.formularioModificado = true;
      } else {
        this.formularioModificado = false;
      }
    });

  }
  public mensajeResultado : string = '';
  public exitoOperacion : boolean = false;
  private formBuilder = inject(FormBuilder);
  private validaciones = inject(ValidacionesService)
  public accionesFormulario = inject(FormulariosService);
  private subestacionService = inject(SubestacionService);
  private unidadRegionalService = inject(UnidadRegionalService);
  public unidadesRegionales: UnidadRegional[] = [];
  private modalAbierto: boolean = false;
  private cuadroDialogo = inject(MatDialog);
  private formularioModificado: boolean = false;
  private router = inject(Router);

  public contenedorFormulario = this.formBuilder.group({
    id: [0],
    nombreUbicacion: ['', { validators: [Validators.required, this.validaciones.esSoloLetras(), Validators.maxLength(100), Validators.minLength(3)] }],
    identificador: ['', { validators: [Validators.required, Validators.maxLength(20), Validators.minLength(3)] }],
    unidadRegionalId: [null, { validators: [Validators.required] }]
  });

  registrarSubestacion() {
    const valoresFormulario = this.contenedorFormulario.value as Subestacion;

    this.subestacionService.crearSubestacion(valoresFormulario).subscribe(subestacion => {
      this.accionesFormulario.limpiarFormulario(this.contenedorFormulario);
      this.mensajeResultado = 'Subestación agregada correctamente';
      this.exitoOperacion = true;
    },
    error =>{
        if(error.status === 409){
          this.mensajeResultado = 'El identificador o el nombre de ubicación ya existen';
          this.exitoOperacion = false;
        }
    });
  }

  verificarAbandonoFormulario() {
    if (this.formularioModificado) {
      this.abrirDialogoConfirmacion();
    } else {
      this.router.navigate(['/menu-administrador']);
    }
  }

  abrirDialogoConfirmacion(): void {
    if (!this.modalAbierto) {
      this.modalAbierto = true;
      const dialogRef = this.cuadroDialogo.open(DialogoConfirmacionComponent, {
        width: '700px',
        height: '200px',
        data: datosConfirmacionSalidaFormulario
      });
      dialogRef.afterClosed().subscribe(result => {
        this.modalAbierto = false;
      });
    }

  }

}
