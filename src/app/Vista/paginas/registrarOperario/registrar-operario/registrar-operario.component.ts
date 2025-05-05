import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormulariosService } from '../../../../Util/Formularios/formularios.service';
import { ValidacionesService } from '../../../../Util/Validaciones/validaciones.service';
import { UsuarioService } from '../../../../Controlador/Usuario/usuario.service';
import { UnidadRegionalService } from '../../../../Controlador/UnidadRegional/unidad-regional.service';
import { UnidadRegional } from '../../../../Modelo/unidadRegional';
import { Usuario } from '../../../../Modelo/Usuario';
import { AESService } from '../../../../Util/Encriptacion/AES/aes.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../../componentes/dialogoConfirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { datosConfirmacionSalidaFormulario } from '../../../../Modelo/DatosDialogoConfirmacion';
import { CommonModule } from '@angular/common';
import { SubestacionService } from '../../../../Controlador/Subestacion/subestacion.service';
import { Subestacion } from '../../../../Modelo/subestacion';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'registrar-operario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './registrar-operario.component.html',
  styleUrl: './registrar-operario.component.css'
})
export class RegistrarOperarioComponent implements OnInit {



  ngOnInit(): void {

    this.unidadRegionalService.obtenerUnidadesRegionales().subscribe(unidadesRegionales => {
      this.unidadesRegionales = unidadesRegionales;
    });

    this.contenedorFormulario.valueChanges.subscribe((valores) => {
      if (!this.contenedorFormulario.pristine && !this.accionesFormulario.esFormularioVacio(valores)) {
        this.formularioModificado = true;
      } else {
        this.formularioModificado = false;
      }
    });

    this.contenedorFormulario.get('unidadRegionalId')?.valueChanges.subscribe(idUnidadRegional => {
      if (idUnidadRegional) {
        this.subestacionService.obtenerSubestacionesPorUnidadRegional(Number(idUnidadRegional))
          .subscribe(subestaciones => {
            this.subestaciones = subestaciones;
            if (this.subestaciones.length === 0) {
              this.contenedorFormulario.get('subestacionId')?.setErrors({ noSubestaciones: true });
            } else {
              this.contenedorFormulario.get('subestacionId')?.setErrors(null);
            }
          });
      } else {
        this.subestaciones = [];
        this.contenedorFormulario.get('subestacionId')?.setErrors({ noSubestaciones: true });
      }
    });

  }


  public mensajeResultado: string = '';
  public exitoOperacion: boolean = false;
  private modalAbierto: boolean = false;
  private formularioModificado: boolean = false;
  private formBuilder = inject(FormBuilder);
  public accionesFormulario = inject(FormulariosService);
  private validaciones = inject(ValidacionesService);
  private usuarioService = inject(UsuarioService);
  private unidadRegionalService = inject(UnidadRegionalService);
  private subestacionService = inject(SubestacionService);
  public unidadesRegionales: UnidadRegional[] = [];
  public subestaciones: Subestacion[] = [];
  private encriptacion = inject(AESService);
  private cuadroDialogo = inject(MatDialog);
  private router = inject(Router);
  public mostrarMensajeInformativo : boolean = false;

  public contenedorFormulario = this.formBuilder.group({
    id: [0],
    contrasenia: ['', [Validators.required, Validators.minLength(8), this.validaciones.esContraseniaSegura()]],
    nombreUsuario: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email, Validators.maxLength(50), this.validaciones.esCorreoValido()]],
    nombre: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3), this.validaciones.esSoloLetras(), this.validaciones.esCaracterEspecial()]],
    apellido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(70), this.validaciones.esSoloLetras(), this.validaciones.esCaracterEspecial()]],
    identificador: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
    rol: ['', [Validators.required]],
    subestacionId: ['', [Validators.required]],
    unidadRegionalId: [null, [Validators.required]]
  });

  registrarNuevoUsuario(): void {

    const contraseniaEncriptada = this.encriptacion.encriptarAES(this.contenedorFormulario.value.contrasenia || '');

    const valoresFormulario: Usuario = {
      id: Number(this.contenedorFormulario.value.id) || 0,
      contrasenia: contraseniaEncriptada,
      nombreUsuario: this.contenedorFormulario.value.nombreUsuario || '',
      correo: this.contenedorFormulario.value.correo || '',
      nombre: this.contenedorFormulario.value.nombre || '',
      apellido: this.contenedorFormulario.value.apellido || '',
      identificador: this.contenedorFormulario.value.identificador || '',
      rol: this.contenedorFormulario.value.rol || '',
      subestacionId: Number(this.contenedorFormulario.value.subestacionId) || 0,
      unidadRegionalId: Number(this.contenedorFormulario.value.unidadRegionalId) || 0
    };

    this.usuarioService.crearUsuario(valoresFormulario).subscribe(respuesta => {
      this.accionesFormulario.limpiarFormulario(this.contenedorFormulario);
      this.mensajeResultado = 'Operario registrado exitosamente';
      this.exitoOperacion = true;
    },
      error => {
        if (error.status === 409) {
          this.mensajeResultado = 'El identificador o nombre de usuario ya existen';
          this.exitoOperacion = false;
        }
      });
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

  verificarAbandonoFormulario() {
    if (this.formularioModificado) {
      this.abrirDialogoConfirmacion();
    } else {
      this.router.navigate(['/menu-administrador']);
    }
  }

  habilitarMensajeInformativo() : void{
    this.mostrarMensajeInformativo = true;
  }

  ocultarMensajeInformativo() : void{
  
    this.mostrarMensajeInformativo = false;
  }


}
