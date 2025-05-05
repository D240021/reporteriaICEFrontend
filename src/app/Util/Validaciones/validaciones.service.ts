import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }


  esSoloLetras(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;
      const esValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s!@#$%^&*(),.?":{}|<>_\-+=/'`~\[\]\\]+$/.test(valor);
      return esValido ? null : { esSoloLetras: true };
    };
  }

  esContraseniaSegura(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;

      // Verificar que el campo tenga al menos 8 caracteres
      const longitudValida = /.{8,}/.test(valor);
      // Verificar al menos una letra mayúscula
      const tieneMayuscula = /[A-Z]/.test(valor);
      // Verificar al menos una letra minúscula
      const tieneMinuscula = /[a-z]/.test(valor);
      // Verificar al menos un número
      const tieneNumero = /[0-9]/.test(valor);
      // Verificar al menos un carácter especial
      const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(valor);

      const esSegura = longitudValida && tieneMayuscula && tieneMinuscula && tieneNumero && tieneCaracterEspecial;

      return esSegura ? null : { esContraseniaSegura: true };
    };
  }

  esCaracterEspecial(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;
      const tieneCaracteresEspeciales = /[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]/.test(valor);
      return !tieneCaracteresEspeciales ? null : { esCaracterEspecial: true };
    };

  }

  esCorreoValido(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;
      const correoValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const caracteresEspeciales = /[!#$%^&*(),?":{}|<>;]/;

      if (caracteresEspeciales.test(valor)) {
        return { caracteresEspecialesNoPermitidos: true };
      }

      if (!correoValido.test(valor)) {
        return { correoInvalido: true };
      }

      return null;
    };
  }

  
}
