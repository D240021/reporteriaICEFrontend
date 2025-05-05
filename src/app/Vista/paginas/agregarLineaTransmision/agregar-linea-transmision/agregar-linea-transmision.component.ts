import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormulariosService } from '../../../../Util/Formularios/formularios.service';
import { ValidacionesService } from '../../../../Util/Validaciones/validaciones.service';
import { LineaTransmisionService } from '../../../../Controlador/LineaTransmision/linea-transmision.service';
import { LineaTransmision } from '../../../../Modelo/LineaTransmision';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../../componentes/dialogoConfirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { datosConfirmacionSalidaFormulario } from '../../../../Modelo/DatosDialogoConfirmacion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'agregar-linea-transmision',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, CommonModule],
  templateUrl: './agregar-linea-transmision.component.html',
  styleUrl: './agregar-linea-transmision.component.css'
})
export class AgregarLineaTransmisionComponent implements OnInit {

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
  private validaciones = inject(ValidacionesService)
  public accionesFormulario = inject(FormulariosService);
  private lineaTransmision = inject(LineaTransmisionService);
  private modalAbierto: boolean = false;
  private cuadroDialogo = inject(MatDialog);
  private formularioModificado: boolean = false;
  private router = inject(Router);

  public contenedorFormulario = this.formBuilder.group({
    id: [0],
    nombreUbicacion: ['', { validators: [Validators.required, this.validaciones.esSoloLetras(), Validators.maxLength(100), Validators.minLength(3)] }],
    identificador: ['', { validators: [Validators.required, Validators.maxLength(20), Validators.minLength(3)] }]
  });

  registrarLineaTransmision() {
    const valoresFormulario = this.contenedorFormulario.value as LineaTransmision;

    this.lineaTransmision.crearLineaTransmision(valoresFormulario).subscribe(lineaTransmision => {
      this.accionesFormulario.limpiarFormulario(this.contenedorFormulario);
      this.mensajeResultado = 'Línea de Transmisión agregada correctamente';
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
