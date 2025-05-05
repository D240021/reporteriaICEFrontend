import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BuscadorComponent } from '../../../componentes/buscador/buscador/buscador.component';
import { Subestacion } from '../../../../Modelo/subestacion';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormulariosService } from '../../../../Util/Formularios/formularios.service';
import { ValidacionesService } from '../../../../Util/Validaciones/validaciones.service';
import { SubestacionService } from '../../../../Controlador/Subestacion/subestacion.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'editar-subestacion',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-subestacion.component.html',
  styleUrl: './editar-subestacion.component.css'
})
export class EditarSubestacionComponent {

  subestacion: any;

  public mensajeResultado : string = '';
  private formBuilder = inject(FormBuilder);
  public accionesFormulario = inject(FormulariosService);
  private validaciones = inject(ValidacionesService);
  public contenedorFormulario = this.formBuilder.group({
    id: [0],
    identificador: ['', { validators: [Validators.required] }],
    nombreUbicacion: ['', { validators: [Validators.required, this.validaciones.esSoloLetras()] }],
  });
  private subestacionService = inject(SubestacionService);

  constructor(
    public referenciaDialogo: MatDialogRef<EditarSubestacionComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: { subestacion: Subestacion }
  ) {
    this.subestacion = datos;
    this.contenedorFormulario.patchValue(this.subestacion);
  }

  cerrarCuadroDialogo() {
    this.referenciaDialogo.close();
  }

  guardarCambios() {
    const nuevosDatosSubestacion = this.contenedorFormulario.value as Subestacion;
    nuevosDatosSubestacion.unidadRegionalId = this.subestacion.unidadRegionalId;
    this.subestacionService.editarSubestacion(nuevosDatosSubestacion).subscribe(respuesta => {
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
      if (valoresFormulario.hasOwnProperty(key) && key in this.subestacion) {
        if (valoresFormulario[key as keyof typeof valoresFormulario] !== this.subestacion[key as keyof Subestacion]) {
          return true; 
        }
      }
    }
    return false; 
  }


}
