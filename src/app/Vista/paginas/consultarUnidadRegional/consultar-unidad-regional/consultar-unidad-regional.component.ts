import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BuscadorComponent } from '../../../componentes/buscador/buscador/buscador.component';
import { UnidadRegional } from '../../../../Modelo/unidadRegional';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UnidadRegionalService } from '../../../../Controlador/UnidadRegional/unidad-regional.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarUnidadRegionalComponent } from '../../editarUnidadRegional/editar-unidad-regional/editar-unidad-regional.component';
import { AnimacionCargaComponent } from '../../../componentes/animacionCarga/animacion-carga/animacion-carga.component';

@Component({
  selector: 'consultar-unidad-regional',
  standalone: true,
  imports: [MatTableModule, MatInputModule, RouterLink,
    ReactiveFormsModule, MatIconModule, MatButtonModule, AnimacionCargaComponent],
  templateUrl: './consultar-unidad-regional.component.html',
  styleUrl: './consultar-unidad-regional.component.css'
})
export class ConsultarUnidadRegionalComponent implements OnInit {

  private modalAbierto: boolean = false;

  public unidadesRegionalesOriginales: UnidadRegional[] = [];
  public unidadesRegionales: UnidadRegional[] = [];

  public atributosUnidad = ['IDENTIFICADOR', 'NOMBRE DE UBICACIÓN', 'GESTIÓN'];

  private formBuilder = inject(FormBuilder);
  private unidadRegionalService = inject(UnidadRegionalService);

  public contenedorFormulario = this.formBuilder.group({
    valor: ['', { validators: [Validators.required] }],
    filtro: ['', { validators: [Validators.required] }]
  });

  private cuadroDialogo = inject(MatDialog);

  ngOnInit(): void {

    this.obtenerUnidadesRegionales();

    this.contenedorFormulario.valueChanges.subscribe(() => {
      this.filtrarValores();
    });
  }

  obtenerUnidadesRegionales(): void {
    this.unidadRegionalService.obtenerUnidadesRegionales().subscribe(unidadesRegionales => {
      this.unidadesRegionalesOriginales = unidadesRegionales;
      this.unidadesRegionales = unidadesRegionales;
    });
    return;
  }

  filtrarValores(): void {
    const { valor, filtro } = this.contenedorFormulario.value;
  
    if (!valor) {
      this.unidadesRegionales = this.unidadesRegionalesOriginales;
    } else {
      this.unidadesRegionales = this.unidadesRegionalesOriginales.filter(unidad => {
        if (!filtro) {
          return [
            unidad.identificador,
            unidad.nombreUbicacion
          ].some(campo => campo?.toLowerCase().includes(valor.toLowerCase()));
        }
  
        const campo = filtro === 'identificador' ? unidad.identificador : unidad.nombreUbicacion;
        return campo.toLowerCase().includes(valor.toLowerCase());
      });
    }
  }

  abrirEditarUnidadRegional(unidadRegional: UnidadRegional): void {
    if (!this.modalAbierto) {
      this.modalAbierto = true;
      const dialogRef = this.cuadroDialogo.open(EditarUnidadRegionalComponent, {
        width: '700px',
        height: '200px',
        data: unidadRegional
      });
      dialogRef.afterClosed().subscribe(result => {
        this.modalAbierto = false;
        this.obtenerUnidadesRegionales();
      });
    }

  }
}
