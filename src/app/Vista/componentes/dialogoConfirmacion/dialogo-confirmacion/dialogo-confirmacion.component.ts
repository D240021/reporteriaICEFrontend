import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { DatosConfirmacion } from '../../../../Modelo/DatosDialogoConfirmacion';
import { SeguridadService } from '../../../../Seguridad/Seguridad/seguridad.service';

@Component({
  selector: 'dialogo-confirmacion',
  standalone: true,
  imports: [ MatDialogModule],
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrl: './dialogo-confirmacion.component.css'
})
export class DialogoConfirmacionComponent {

  public datosComponente: DatosConfirmacion;
  private seguridadService = inject(SeguridadService);
  private router = inject(Router);

  constructor(public referenciaDialogo: MatDialogRef<DialogoConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosConfirmacion
  ) {
    this.datosComponente = datos;
  }

  cerrarCuadroDialogo(mensajeConfirmacion : string): void {
    this.referenciaDialogo.close(mensajeConfirmacion);
    return;
  }

  salirCuadroDialogo(): void {
    
    if (this.datosComponente.tipo === 'sesion') {
      this.seguridadService.cerrarSesion();
    } else if(this.datosComponente.tipo === 'formularioAdmin') {
      this.router.navigate(['/menu-administrador']);
    } else if(this.datosComponente.tipo === 'formularioTLT') {
      this.router.navigate(['/menu-tlt']);
    } else if(this.datosComponente.tipo === 'formularioSprv') {
      this.router.navigate(['/menu-supervisor']);
    }

    this.cerrarCuadroDialogo('Confirmacion');
    return;
  }
}
