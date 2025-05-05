import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../Modelo/Usuario';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor() { }
  
  private router = inject(Router);

  establecerRol(rol : string) : void {
    localStorage.setItem('rol', rol);
  }

  estaLogeado() : boolean {
    return true;
  }

  obtenerRol() : string {
    return localStorage.getItem('rol') || '';
  }

  limpiarRol() : void {
    localStorage.removeItem('rol');
  }

  cerrarSesion() : void{
    this.limpiarRol();
    this.limpiarUsuarioLogeado();
    this.router.navigate(['/inicio-sesion']);
  }

  guardarInformacionUsuarioLogeado(usuario : Usuario) : void{
    localStorage.setItem('usuarioLoggeado', JSON.stringify(usuario));
  }

  obtenerInformacionUsuarioLogeado() : Usuario {
    return JSON.parse(localStorage.getItem('usuarioLoggeado') || '');
  }

  limpiarUsuarioLogeado() : void {
    localStorage.removeItem('usuarioLoggeado');
  }
}
