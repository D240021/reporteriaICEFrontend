import { Component, inject, OnInit } from '@angular/core';
import { BuscadorComponent } from '../../../componentes/buscador/buscador/buscador.component';
import { MatTableModule } from '@angular/material/table';
import { LineaTransmision } from '../../../../Modelo/LineaTransmision';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LineaTransmisionService } from '../../../../Controlador/LineaTransmision/linea-transmision.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarLineaTransmisionComponent } from '../../editarLineaTransmision/editar-linea-transmision/editar-linea-transmision.component';
import { MatButtonModule } from '@angular/material/button';
import { AnimacionCargaComponent } from '../../../componentes/animacionCarga/animacion-carga/animacion-carga.component';


@Component({
  selector: 'consultar-linea-transmision',
  standalone: true,
  imports: [BuscadorComponent, MatTableModule, RouterLink, MatInputModule, MatIconModule,
    ReactiveFormsModule, MatButtonModule, AnimacionCargaComponent
  ],
  templateUrl: './consultar-linea-transmision.component.html',
  styleUrl: './consultar-linea-transmision.component.css'
})
export class ConsultarLineaTransmisionComponent implements OnInit{
  
  
  ngOnInit(): void {
    
    this.obtenerLineasTransmision();

    this.contenedorFormulario.valueChanges.subscribe(() => {
      this.filtrarValores();
    });
  }
  private modalAbierto: boolean = false;

  public lineasTransmisionOriginales: LineaTransmision[] = [];
  public lineasTransmision: LineaTransmision[] = [];


  public atributosLinea = ['IDENTIFICADOR', 'NOMBRE DE UBICACIÓN', 'GESTIÓN'];

  private formBuilder = inject(FormBuilder);
  private lineaTransmisionService = inject(LineaTransmisionService);

  public contenedorFormulario = this.formBuilder.group({
    valor: ['', { validators: [Validators.required] }],
    filtro: ['', { validators: [Validators.required] }]
  });

  private cuadroDialogo = inject(MatDialog);

  obtenerLineasTransmision(): void {
    this.lineaTransmisionService.obtenerLineasTransmision().subscribe(lineasTransmision => {
      this.lineasTransmisionOriginales = lineasTransmision;
      this.lineasTransmision = lineasTransmision;
    });
    return;
  }

  filtrarValores(): void {
    const { valor, filtro } = this.contenedorFormulario.value;
  
    if (!valor) {
      this.lineasTransmision = this.lineasTransmisionOriginales;
    } else {
      this.lineasTransmision = this.lineasTransmisionOriginales.filter(lineaTransmision => {
        if (!filtro) {
          return [
            lineaTransmision.identificador,
            lineaTransmision.nombreUbicacion
          ].some(campo => campo?.toLowerCase().includes(valor.toLowerCase()));
        }
  
        const campoFiltrado = filtro === 'identificador' 
          ? lineaTransmision.identificador 
          : lineaTransmision.nombreUbicacion; 
        return campoFiltrado?.toLowerCase().includes(valor.toLowerCase());
      });
    }
  }

  abrirEditarLineaTransmision(lineaTransmision: LineaTransmision): void {
    if (!this.modalAbierto) {
      this.modalAbierto = true;
      const dialogRef = this.cuadroDialogo.open(EditarLineaTransmisionComponent, {
        width: '700px',
        height: '200px',
        data: lineaTransmision
      });
      dialogRef.afterClosed().subscribe(result => {
        this.modalAbierto = false;
        this.obtenerLineasTransmision();
      });
    }

  }

}
