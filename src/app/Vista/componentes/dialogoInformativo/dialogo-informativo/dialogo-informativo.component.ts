import { Component, Inject } from '@angular/core';
import { DatoInformativo } from '../../../../Modelo/DatosDialogoInformativo';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-informativo',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './dialogo-informativo.component.html',
  styleUrl: './dialogo-informativo.component.css'
})
export class DialogoInformativoComponent {

  public informacionAMostrar !: DatoInformativo;

  constructor(public referenciaDialogo: MatDialogRef<DialogoInformativoComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: DatoInformativo
  ) {
    this.informacionAMostrar = datos;
  }
}
