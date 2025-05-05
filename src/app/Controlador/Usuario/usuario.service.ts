import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ambiente } from '../../Ambientes/ambienteDesarrollo';
import { AutenticacionUsuario, Usuario } from '../../Modelo/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = ambiente.apiURL + '/Usuario';


  public crearUsuario(usuario: Usuario): Observable<any>{
    return this.http.post(this.urlBase, usuario);
  }

  public obtenerUsuarios(){
    return this.http.get<Usuario[]>(this.urlBase);
  }

  public obtenerTPMSegunUnidadRegional(idUnidadRegional : number){
    const nuevoUrl = `${this.urlBase}/UnidadRegional/TPM/${idUnidadRegional}`
    return this.http.get<Usuario[]>(nuevoUrl)
  } 

  public obtenerTLTSegunUnidadRegional(idUnidadRegional : number){
    const nuevoUrl = `${this.urlBase}/UnidadRegional/TLT/${idUnidadRegional}`
    return this.http.get<Usuario[]>(nuevoUrl)
  } 

  public obtenerSPRVSegunUnidadRegional(idUnidadRegional : number){
    const nuevoUrl = `${this.urlBase}/UnidadRegional/SPRV/${idUnidadRegional}`
    return this.http.get<Usuario[]>(nuevoUrl)
  } 

  public esUsuarioAutenticado(datosAutenticacion: AutenticacionUsuario){
    
    const nuevoUrl = `${this.urlBase}/IniciarSesion`;
    return this.http.post(nuevoUrl, datosAutenticacion);
  }

  public editarUsuario(usuario : Usuario){
    return this.http.put(`${this.urlBase}/${usuario.id}`, usuario);
  }

  public obtenerUsuarioPorId(idUsuario : number) : Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlBase}/${idUsuario}`);

  }
}
