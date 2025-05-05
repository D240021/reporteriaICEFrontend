import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ItemSeleccionado {
  nombre: string;
  seleccionado: boolean;
}

@Component({
  selector: 'multiselector-checkbox',
  standalone: true,
  templateUrl: './multiselector-checkbox.html',
  styleUrls: ['./multiselector-checkbox.css'],
  imports: [CommonModule, FormsModule]
})
export class MultiSelectorCheckbox {
  @Input() lista: ItemSeleccionado[] = [];

  @Output() compartirListaSeleccionada = new EventEmitter<string[]>();
  @Output() compartirSeleccionIndividual = new EventEmitter<{ seleccionado: boolean, nombre: string }>();

  listaSeleccionada: string[] = [];
  seleccionadoActual!: { seleccionado: boolean, nombre: string };

  mostrarDesplegable: boolean = false;


  obtenerValorSeleccionado(estado: boolean, valor: string) {
    if (estado) {
      this.listaSeleccionada.push(valor);
    } else {
      const indice = this.listaSeleccionada.indexOf(valor);
      if (indice !== -1) {
        this.listaSeleccionada.splice(indice, 1);
      }
    }

    this.seleccionadoActual = { seleccionado: estado, nombre: valor };

    // Compartir la lista seleccionada
    this.compartirListaSeleccionada.emit(this.listaSeleccionada);

    // Compartir el estado individual del ítem seleccionado
    this.compartirSeleccionIndividual.emit(this.seleccionadoActual);
  }
}
