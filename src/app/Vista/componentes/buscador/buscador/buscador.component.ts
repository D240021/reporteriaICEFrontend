import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'buscador',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent implements OnInit {
  control = new FormControl();
  opcionesFiltradas: Observable<any[]> = new Observable();

  @Input()
  datos: any[] = [];
  @Input()
  accionInput! : string;
  @Input()
  accionPlaceholder! : string;

  @Output()
  valorBuscado = new EventEmitter<string>;

  ngOnInit(): void {
  
    this.opcionesFiltradas = this.control.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value?.nombre || '')),
      map(nombre => nombre ? this._filtrar(nombre) : this.datos.slice())
    );
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) : void {
    const valorNombre = event.option.value.nombre;
    const valorIdentificador = event.option.value.identificador;
    valorIdentificador ? 
    this.control.patchValue(valorIdentificador + ' ' + valorNombre):
    this.control.patchValue(valorNombre)
    return;
  }

  private _filtrar(nombre: string): any[] {
    const valorFiltro = nombre.toLowerCase();
    return this.datos.filter(opcion => opcion.nombre.toLowerCase().includes(valorFiltro));
  }

  obtenerIdentificadorValorSeleccionado() : string {
    return this.control.value.split(' ')[0];
  }


  emitirBusqueda() : void {
    
    this.valorBuscado.emit(this.obtenerIdentificadorValorSeleccionado());
    return;
  }
} 
