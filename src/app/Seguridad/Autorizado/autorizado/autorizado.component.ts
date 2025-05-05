import { Component, inject, Input } from '@angular/core';
import { SeguridadService } from '../../Seguridad/seguridad.service';

@Component({
  selector: 'app-autorizado',
  standalone: true,
  imports: [],
  templateUrl: './autorizado.component.html',
  styleUrl: './autorizado.component.css'
})
export class AutorizadoComponent {

  private seguridadService = inject(SeguridadService);

  @Input()
  rol?: string;

  estaAutorizado(): boolean {

    return this.rol ? 
    this.seguridadService.obtenerRol() === this.rol : this.seguridadService.estaLogeado();

  }

}
