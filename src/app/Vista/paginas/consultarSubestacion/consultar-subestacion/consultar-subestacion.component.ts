import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subestacion } from '../../../../Modelo/subestacion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SubestacionService } from '../../../../Controlador/Subestacion/subestacion.service';
import { EditarSubestacionComponent } from '../../editarSubestacion/editar-subestacion/editar-subestacion.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AnimacionCargaComponent } from '../../../componentes/animacionCarga/animacion-carga/animacion-carga.component';

@Component({
  selector: 'consultar-subestacion',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatIconModule, MatDialogModule, MatTableModule, 
    MatButtonModule, AnimacionCargaComponent],
  templateUrl: './consultar-subestacion.component.html',
  styleUrl: './consultar-subestacion.component.css'
})
export class ConsultarSubestacionComponent {

  ngOnInit(): void {
    
    this.obtenerSubestaciones();

    this.contenedorFormulario.valueChanges.subscribe(() => {
      this.filtrarValores();
    });
  }
  private modalAbierto: boolean = false;

  public subestacionesOriginales: Subestacion[] = [];
  public subestaciones: Subestacion[] = [];


  public atributosLinea = ['IDENTIFICADOR', 'NOMBRE DE UBICACIÓN', 'UNIDAD REGIONAL', 'GESTIÓN'];

  private formBuilder = inject(FormBuilder);
  private subestacionService = inject(SubestacionService);

  public contenedorFormulario = this.formBuilder.group({
    valor: ['', { validators: [Validators.required] }],
    filtro: ['', { validators: [Validators.required] }]
  });

  private cuadroDialogo = inject(MatDialog);

  obtenerSubestaciones(): void {
    this.subestacionService.obtenerSubestaciones().subscribe(subestacion => {
      this.subestacionesOriginales = subestacion;
      this.subestaciones = subestacion;
    });
    return;
  }

  filtrarValores(): void {
    const { valor, filtro } = this.contenedorFormulario.value;
  
    if (!valor) {
      this.subestaciones = this.subestacionesOriginales;
    } else {
      this.subestaciones = this.subestacionesOriginales.filter(subestacion => {
        if (!filtro) {
          return [
            subestacion.identificador,
            subestacion.nombreUbicacion,
          ].some(campo => campo?.toLowerCase().includes(valor.toLowerCase()));
        }
  
        const campoFiltrado = filtro === 'identificador' 
          ? subestacion.identificador 
          : subestacion.nombreUbicacion; 
        return campoFiltrado?.toLowerCase().includes(valor.toLowerCase());
      });
    }
  }

  abrirEditarLineaTransmision(subestacion: Subestacion): void {
    if (!this.modalAbierto) {
      this.modalAbierto = true;
      const dialogRef = this.cuadroDialogo.open(EditarSubestacionComponent, {
        width: '700px',
        height: '200px',
        data: subestacion
      });
      dialogRef.afterClosed().subscribe(result => {
        this.modalAbierto = false;
        this.obtenerSubestaciones();
      });
    }

  }

}
