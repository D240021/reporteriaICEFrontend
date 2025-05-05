import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../../Modelo/Usuario';
import { FormulariosService } from '../../../../Util/Formularios/formularios.service';
import { ValidacionesService } from '../../../../Util/Validaciones/validaciones.service';
import { UsuarioService } from '../../../../Controlador/Usuario/usuario.service';

@Component({
  selector: 'editar-operario',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './editar-operario.component.html',
  styleUrls: ['./editar-operario.component.css']
})
export class EditarOperarioComponent{

  operario: any;

  public mensajeResultado: string = '';
  public exitoOperacion: boolean = false;
  private formBuilder = inject(FormBuilder);
  public accionesFormulario = inject(FormulariosService);
  private validaciones = inject(ValidacionesService);
  public contenedorFormulario = this.formBuilder.group({
    id: [0],
    contrasenia: ['12345678'],
    nombreUsuario: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email, Validators.maxLength(50), this.validaciones.esCorreoValido()]],
    nombre: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3), this.validaciones.esSoloLetras(), this.validaciones.esCaracterEspecial()]],
    apellido: ['', [Validators.required, Validators.minLength(5) ,Validators.maxLength(70), this.validaciones.esSoloLetras(), this.validaciones.esCaracterEspecial()]],
    identificador: [''],
    rol: [''],
    subestacionId: [0],
    unidadRegionalId: [0]
  });
  private usuarioService = inject(UsuarioService);

  constructor(
    public referenciaDialogo: MatDialogRef<EditarOperarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: { operario: Usuario }
  ) {
    this.operario = datos;
    this.contenedorFormulario.patchValue(this.operario);
    console.log(this.operario);
  }


  cerrarCuadroDialogo() {
    this.referenciaDialogo.close();
  }

  guardarCambios() {
    console.log(this.operario);
    const nuevosDatosUsuario = this.contenedorFormulario.value as Usuario;
    console.log(nuevosDatosUsuario);
    this.usuarioService.editarUsuario(nuevosDatosUsuario).subscribe(respuesta => {
      this.cerrarCuadroDialogo();
    },
      error => {
        if (error.status === 409) {
          this.mensajeResultado = 'El identificador o nombre de usuario ya existen';
          this.exitoOperacion = false;
        }
      });

  }

  esFormularioModificado(): boolean {
    const valoresFormulario = this.contenedorFormulario.value;
    for (const key in valoresFormulario) {
      if (valoresFormulario.hasOwnProperty(key) && key in this.operario) {
        const valorFormulario = valoresFormulario[key as keyof typeof valoresFormulario];
        const valorOriginal = this.operario[key as keyof Usuario];
  
        if (valorFormulario !== valorOriginal && (valorFormulario || valorOriginal)) {
          return true;
        }
      }
    }
    return false;
  }
}
