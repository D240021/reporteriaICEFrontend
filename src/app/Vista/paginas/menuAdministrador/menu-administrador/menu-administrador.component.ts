import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { SeguridadService } from '../../../../Seguridad/Seguridad/seguridad.service';
import { DialogoConfirmacionComponent } from "../../../componentes/dialogoConfirmacion/dialogo-confirmacion/dialogo-confirmacion.component";
import { MatDialog } from '@angular/material/dialog';
import { datosCerrarSesion } from '../../../../Modelo/DatosDialogoConfirmacion';


@Component({
  selector: 'menu-administrador',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './menu-administrador.component.html',
  styleUrl: './menu-administrador.component.css'
})
export class MenuAdministradorComponent {

  private modalAbierto: boolean = false;
  public seguridadService = inject(SeguridadService);
  private cuadroDialogo = inject(MatDialog);
  
  abrirCuadroDialogo(): void {


    if (!this.modalAbierto) {
      this.modalAbierto = true;
      const dialogRef = this.cuadroDialogo.open(DialogoConfirmacionComponent, {
        width: '400px',
        height: '200px',
        data: datosCerrarSesion
      });
      dialogRef.afterClosed().subscribe(result => {
        this.modalAbierto = false;
      });
    }

  }

}
