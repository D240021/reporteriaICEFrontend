import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormulariosService } from '../../../../Util/Formularios/formularios.service';
import { ValidacionesService } from '../../../../Util/Validaciones/validaciones.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../../Modelo/Usuario';
import { UnidadRegionalService } from '../../../../Controlador/UnidadRegional/unidad-regional.service';
import { UnidadRegional } from '../../../../Modelo/unidadRegional';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'editar-unidad-regional',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule],
  templateUrl: './editar-unidad-regional.component.html',
  styleUrl: './editar-unidad-regional.component.css'
})
export class EditarUnidadRegionalComponent {
  public unidadRegional: any;

  public mensajeResultado : string = '';
  private formBuilder = inject(FormBuilder);
  public accionesFormulario = inject(FormulariosService);
  private validaciones = inject(ValidacionesService);
  public contenedorFormulario = this.formBuilder.group({
    id: [0],
    identificador: ['', {validators: [Validators.required]}],
    nombreUbicacion: ['', {validators: [Validators.required, this.validaciones.esSoloLetras()]}],
  });
  private unidadRegionalService = inject(UnidadRegionalService);

  constructor(
    public referenciaDialogo: MatDialogRef<EditarUnidadRegionalComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: { unidadRegional: UnidadRegional }
  ) {
    this.unidadRegional = datos;
    this.contenedorFormulario.patchValue(this.unidadRegional);
  }

  cerrarCuadroDialogo() {
    this.referenciaDialogo.close();
  }

  guardarCambios() {

    const nuevosDatosUnidadRegional = this.contenedorFormulario.value as UnidadRegional;

    this.unidadRegionalService.editarUnidadRegional(nuevosDatosUnidadRegional).subscribe(respuesta => {
      this.cerrarCuadroDialogo();
    },
    error =>{
        if(error.status === 409){
          this.mensajeResultado = 'El nombre de ubicación ya existe';
        }
    });

  }

  esFormularioModificado(): boolean {

    const valoresFormulario = this.contenedorFormulario.value;
    for (const key in valoresFormulario) {
      if (valoresFormulario.hasOwnProperty(key) && key in this.unidadRegional) {
        if (valoresFormulario[key as keyof typeof valoresFormulario] !== this.unidadRegional[key as keyof UnidadRegional]) {
          return true; 
        }
      }
    }
    return false; 
  }


}
