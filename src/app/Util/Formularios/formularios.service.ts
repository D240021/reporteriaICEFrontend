import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormulariosService {

  constructor() { }

  limpiarFormulario(formGroup: FormGroup) {
    formGroup.reset();
    return;
  }

  esFormularioVacio(valores: any): boolean {
    return Object.values(valores).every((valor) => valor === null || valor === '');
  }

  obtenerErroresNombre(contenedorFormulario: FormGroup): string {
    const campo = contenedorFormulario.controls['nombre'] || contenedorFormulario.controls['nombreUbicacion'];

    if (campo.hasError('required') && campo.touched) {
      return 'El campo nombre es requerido';
    }

    if (campo.hasError('esCaracterEspecial') && campo.touched && contenedorFormulario.controls['nombre']) {
      return 'No se permiten caracteres especiales';
    }

    if (campo.hasError('esSoloLetras') && campo.touched) {
      return 'El campo nombre no debe llevar números';
    }

    if (campo.hasError('maxlength') && campo.touched) {
      return 'Máximo 100 caracteres';
    }

    if (campo.hasError('minlength') && campo.touched) {
      return 'Mínimo 3 caracteres';
    }

    return '';
  }

  obtenerErroresIdentificador(contenedorFormulario: FormGroup): string {
    const campo = contenedorFormulario.controls['identificador'];

    if (campo.hasError('maxlength') && campo.touched) {
      return 'Máximo 20 caracteres';
    }

    if (campo.hasError('minlength') && campo.touched) {
      return 'Mínimo 3 caracteres';
    }

    if (campo.hasError('required') && campo.touched) {
      return 'El campo identificador es requerido';
    }

    return '';
  }

  obtenerErroresNombreUsuario(contenedorFormulario: FormGroup): string {
    const campo = contenedorFormulario.controls['nombreUsuario'];

    if (campo.hasError('maxlength') && campo.touched) {
      return 'Máximo 100 caracteres';
    }

    if (campo.hasError('minlength') && campo.touched) {
      return 'Mínimo 3 caracteres';
    }

    if (campo.hasError('required') && campo.touched) {
      return 'El nombre de usuario es requerido';
    }

    return '';
  }

  obtenerErroresContrasenia(contenedorFormulario: FormGroup): string {
    const campo = contenedorFormulario.controls['contrasenia'];

    if (campo.hasError('required') && campo.touched) {
      return 'La contraseña es requerida';
    }

    if (campo.hasError('esContraseniaSegura') && campo.touched) {

      return 'La contraseña debe de ser segura';
    }

    return '';
  }

  obtenerErroresCorreo(contenedorFormulario: FormGroup): string {
    const campo = contenedorFormulario.controls['correo'];

    if (campo.hasError('required') && campo.touched) {
      return 'El correo es requerido';
    }

    if (campo.hasError('caracteresEspecialesNoPermitidos') && campo.touched) {
      return 'No se permiten caracteres especiales';
    }

    if (campo.hasError('email') && campo.touched) {
      return 'Inserte un correo válido';
    }

    if (campo.hasError('correoInvalido') && campo.touched) {
      return 'Inserte un correo válido';
    }



    return '';
  }

  obtenerErroresApellidos(contenedorFormulario: FormGroup): string {
    const campo = contenedorFormulario.controls['apellido'];

    if (campo.hasError('maxlength') && campo.touched) {
      return 'Máximo 70 caracteres';
    }

    if (campo.hasError('minlength') && campo.touched) {
      return 'Mínimo 5 caracteres';
    }


    if (campo.hasError('required') && campo.touched) {
      return 'Los apellidos son requeridos';
    }

    if (campo.hasError('esCaracterEspecial') && campo.touched) {
      return 'No se permiten caracteres especiales';
    }

    if (campo.hasError('esSoloLetras') && campo.touched) {
      return 'El campo nombre no debe llevar números';
    }

    return '';
  }

  obtenerErroresUnidadRegionalId(contenedorFormulario: FormGroup): string {
    const campo = contenedorFormulario.controls['unidadRegionalId'];

    if (campo.hasError('required') && campo.touched) {
      return 'La Unidad Regional es requerida';
    }


    return '';
  }

  obtenerErroresLineaTransmisionId(contenedorFormulario: FormGroup): string {
    const campo = contenedorFormulario.controls['lineaTransmisionId'];

    if (campo.hasError('required') && campo.touched) {
      return 'Línea de transmisión es requerida';
    }


    return '';
  }

  obtenerErroresSubestacionId(contenedorFormulario: FormGroup): string {
    const campo = contenedorFormulario.controls['subestacionA'] || contenedorFormulario.controls['subestacionB'] || contenedorFormulario.controls['subestacionId'];

    if (campo.hasError('required') && campo.touched) {
      return 'Subestación es requerida';
    }


    return '';
  }

  obtenerErroresSupervisorId(contenedorFormulario: FormGroup): string {
    const campo = contenedorFormulario.controls['usuarioSupervisorId'];

    if (campo.hasError('required') && campo.touched) {
      return 'Supervisor es requerido';
    }


    return '';
  }

  obtenerErroresTecnicoLineaId(contenedorFormulario: FormGroup): string {
    const campo = contenedorFormulario.controls['tecnicoLineaId'];

    if (campo.hasError('required') && campo.touched) {
      return 'Técnico es requerido';
    }


    return '';
  }



  obtenerErroresRol(contenedorFormulario: FormGroup): string {
    const campo = contenedorFormulario.controls['rol'];

    if (campo.hasError('required') && campo.touched) {
      return 'La ocupación es requerida';
    }

    return '';
  }

  obtenerErroresObservaciones(contenedorFormulario: FormGroup): string {
    const campo = contenedorFormulario.controls['observaciones'];

    if (campo.hasError('minlength') && campo.touched) {
      return 'Mínimo 5 caracteres';
    }

    if (campo.hasError('required') && campo.touched) {
      return 'El campo observaciones es requerido';
    }

    return '';
  }

  obtenerErroresCausa(contenedorFormulario: FormGroup): string {
    const campo = contenedorFormulario.controls['causas'];

    if (campo.hasError('required') && campo.touched) {
      return 'La causa es requerida';
    }

    return '';
  }

  obtenerErroresFechaHora(contenedorFormulario: FormGroup): string {
    const campo = contenedorFormulario.controls['fechaHora'];

    if (campo.hasError('required') && campo.touched) {
      return 'La fecha y hora son requeridas';
    }

    return '';
  }


  

}
