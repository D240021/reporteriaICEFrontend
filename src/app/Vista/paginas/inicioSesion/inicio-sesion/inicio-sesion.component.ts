import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AESService } from '../../../../Util/Encriptacion/AES/aes.service';
import { usuarioRoles } from '../../../../Util/Enum/Roles';
import { AutenticacionUsuario, Usuario } from '../../../../Modelo/Usuario';
import { UsuarioService } from '../../../../Controlador/Usuario/usuario.service';
import { SeguridadService } from '../../../../Seguridad/Seguridad/seguridad.service';
import { CommonModule } from '@angular/common';
import { AnimacionCargaComponent } from "../../../componentes/animacionCarga/animacion-carga/animacion-carga.component";
import { datosConfirmacionSalidaFormulario } from '../../../../Modelo/DatosDialogoConfirmacion';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../../componentes/dialogoConfirmacion/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'inicio-sesion',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule,
    CommonModule, AnimacionCargaComponent],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent{

  public habilitarCarga: boolean = false;
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private encriptacion = inject(AESService);
  private usuarioService = inject(UsuarioService);
  private seguridadService = inject(SeguridadService);
  public mensajeCredenciales: string = '';

  public contenedorFormulario = this.formBuilder.group({
    nombreUsuario: ['', { validators: [Validators.required] }],
    contrasenia: ['', { validators: [Validators.required] }]
  });


  verificarCredencialesUsuario() {
    const contraseniaEncriptada = this.encriptacion.encriptarAES(this.contenedorFormulario.value.contrasenia || '');
    const credenciales: AutenticacionUsuario = {
      nombreUsuario: this.contenedorFormulario.value.nombreUsuario || '',
      contrasenia: contraseniaEncriptada
    };
    this.habilitarCarga = true;
    this.usuarioService.esUsuarioAutenticado(credenciales).subscribe(respuesta => {
        if (respuesta && typeof respuesta === 'object') {
          const objetoRespuesta = respuesta as Usuario;
          const rolUsuario = objetoRespuesta.rol.toLocaleLowerCase();
          this.seguridadService.establecerRol(rolUsuario);
          this.seguridadService.guardarInformacionUsuarioLogeado(objetoRespuesta);
          this.redireccionarUsuario(respuesta as Usuario);
          this.mensajeCredenciales = '';
        }
      },
      error => {
        if (error.status === 401) {
          this.mensajeCredenciales = 'El usuario o la contraseña son incorrectos'
          this.habilitarCarga = false;
        }
        
      }

    );
    
  }



  redireccionarUsuario(usuario: Usuario) {
    const tipoUsuario = usuario.rol.toLocaleLowerCase();
    if (tipoUsuario === usuarioRoles.ADMIN.toLocaleLowerCase()) {
      this.router.navigate(['/menu-administrador']);
    } else if (tipoUsuario === usuarioRoles.TPM.toLocaleLowerCase()) {
      // this.router.navigate(['/crear-reporte']);
      this.router.navigate(['/menu-tpm']);
    } else if (tipoUsuario === usuarioRoles.SPRV.toLocaleLowerCase()) {
      this.router.navigate(['/menu-supervisor']);
    } else if (tipoUsuario === usuarioRoles.TLT.toLocaleLowerCase()) {
      this.router.navigate(['/menu-tlt']);
    }
  }

}
