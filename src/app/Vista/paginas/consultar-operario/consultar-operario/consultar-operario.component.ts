import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Usuario } from '../../../../Modelo/Usuario';
import { UsuarioService } from '../../../../Controlador/Usuario/usuario.service';
import { UnidadRegionalService } from '../../../../Controlador/UnidadRegional/unidad-regional.service';
import { UnidadRegional } from '../../../../Modelo/unidadRegional';
import { EditarOperarioComponent } from "../../editarOperario/editar-operario/editar-operario.component";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AnimacionCargaComponent } from '../../../componentes/animacionCarga/animacion-carga/animacion-carga.component';
import { usuarioRoles } from '../../../../Util/Enum/Roles';
@Component({
  selector: 'consultar-operario',
  standalone: true,
  imports: [MatTableModule, MatInputModule,
    ReactiveFormsModule, MatButtonModule, MatIconModule,
    MatDialogModule, AnimacionCargaComponent, RouterLink],
  templateUrl: './consultar-operario.component.html',
  styleUrl: './consultar-operario.component.css'
})
export class ConsultarOperarioComponent implements OnInit {

  public usuariosOriginales: Usuario[] = [];
  public usuarios: Usuario[] = this.usuariosOriginales;

  private formBuilder = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private cuadroDialogo = inject(MatDialog);

  public contenedorFormulario = this.formBuilder.group({
    valor: ['', { validators: [Validators.required] }],
    filtro: ['', { validators: [Validators.required] }]
  });

  private modalAbierto: boolean = false;

  public atributosOperador = ['IDENTIFICADOR', 'NOMBRE', 'APELLIDOS', 'NOMBRE DE USUARIO', 'CORREO',
    'UNIDAD REGIONAL', 'OCUPACIÓN', 'GESTIÓN'];

  ngOnInit(): void {
    this.cargarDatos();
    this.contenedorFormulario.valueChanges.subscribe(() => {
      this.filtrarValores();
    });
  }


  cargarDatos(): void {

    this.usuarioService.obtenerUsuarios().subscribe(usuarios => {
      this.usuariosOriginales = usuarios;
      this.usuarios = usuarios;
      this.construirNombresRoles();
    });

    return;
  }


  filtrarValores(): void {
    const { valor, filtro } = this.contenedorFormulario.value;

    if (!valor) {

      this.usuarios = this.usuariosOriginales;
      return;
    }

    const valorNormalizado = valor.toLowerCase();
    this.usuarios = this.usuariosOriginales.filter(usuario => {

      if (!filtro) {
        return [
          usuario.identificador,
          usuario.nombre,
          usuario.apellido,
          usuario.nombreUsuario,
          usuario.correo,
          usuario.nombreUnidadRegional,
          usuario.rol
        ].some(campo => campo?.toLowerCase().includes(valorNormalizado));
      }


      const campoFiltrado = {
        'identificador': usuario.identificador,
        'nombre': usuario.nombre,
        'apellido': usuario.apellido,
        'nombreUsuario': usuario.nombreUsuario,
        'correo': usuario.correo,
        'unidadRegional': usuario.nombreUnidadRegional,
        'rol': usuario.rol
      }[filtro] || '';

      return campoFiltrado.toLowerCase().includes(valorNormalizado);
    });
  }

  abrirEditarOperario(operario: Usuario): void {

    if (!this.modalAbierto) {
      this.modalAbierto = true;
      const dialogRef = this.cuadroDialogo.open(EditarOperarioComponent, {
        width: '700px',
        height: '500px',
        data: operario
      });
      dialogRef.afterClosed().subscribe(result => {
        this.modalAbierto = false;
        this.cargarDatos();
      });
    }

  }

  construirNombresRoles(): void {

    this.usuarios.forEach(usuario => {
      if (usuario.rol === usuarioRoles.TPM) {
        usuario.nombreRol = 'Técnico Protección';
      } else if (usuario.rol === usuarioRoles.SPRV) {
        usuario.nombreRol = 'Supervisor';
      } else if (usuario.rol === usuarioRoles.TLT) {
        usuario.nombreRol = 'Técnico Línea';
      } else {
        usuario.nombreRol = 'Administrador';
      }

    })
  }

}
