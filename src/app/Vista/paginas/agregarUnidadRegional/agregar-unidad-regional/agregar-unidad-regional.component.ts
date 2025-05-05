import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormulariosService } from '../../../../Util/Formularios/formularios.service';
import { ValidacionesService } from '../../../../Util/Validaciones/validaciones.service';
import { UnidadRegionalService } from '../../../../Controlador/UnidadRegional/unidad-regional.service';
import { UnidadRegional } from '../../../../Modelo/unidadRegional';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../../componentes/dialogoConfirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { datosConfirmacionSalidaFormulario } from '../../../../Modelo/DatosDialogoConfirmacion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'agregar-unidad-regional',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-unidad-regional.component.html',
  styleUrl: './agregar-unidad-regional.component.css'
})
export class AgregarUnidadRegionalComponent implements OnInit {


  ngOnInit(): void {
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
  public accionesFormulario = inject(FormulariosService);
  private validaciones = inject(ValidacionesService)
  private unidadRegionalService = inject(UnidadRegionalService);
  private modalAbierto: boolean = false;
  private cuadroDialogo = inject(MatDialog);
  private formularioModificado: boolean = false;
  private router = inject(Router);


  public contenedorFormulario = this.formBuilder.group({
    id: [0],
    identificador: ['', { validators: [Validators.required, Validators.maxLength(20), Validators.minLength(3)] }],
    nombreUbicacion: ['', { validators: [Validators.required, this.validaciones.esSoloLetras(), Validators.maxLength(100), Validators.minLength(3)] }],
  });

  registrarNuevaUnidadRegional() {
    const valoresFormulario = this.contenedorFormulario.value as UnidadRegional;

    this.unidadRegionalService.crearUnidadRegional(valoresFormulario).subscribe(unidadRegional => {
      this.accionesFormulario.limpiarFormulario(this.contenedorFormulario);
      this.mensajeResultado = 'Unidad registrada exitosamente';
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
