import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reporte } from '../../../../Modelo/Reporte';
import { MatIconModule } from '@angular/material/icon';
import { ReporteService } from '../../../../Controlador/Reporte/reporte.service';

@Component({
  selector: 'consultar-reporte',
  standalone: true,
  imports: [MatTableModule, MatInputModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './consultar-reporte.component.html',
  styleUrls: ['./consultar-reporte.component.css']
})
export class ConsultarReporteComponent implements OnInit {

  public reportes: Reporte[] = [];
  public tipoReporte !: string;
  public reporteService = inject(ReporteService);


  ngOnInit(): void {
    this.reportes = history.state.reportes;
    this.tipoReporte = history.state.tipo;
    this.reportesFiltrados = [...this.reportes];
  }


  public atributosReporte = ['TECNICO LÍNEA ENCARGADO', 'FECHA Y HORA', 'DESCARGAR'];

  public reportesFiltrados: Reporte[] = [];
  private formBuilder = inject(FormBuilder);

  public contenedorFormulario = this.formBuilder.group({
    valor: ['', { validators: [Validators.required] }],
    filtro: ['', { validators: [Validators.required] }]
  });


  aplicarFiltro(): void {
    const filtro = this.contenedorFormulario.controls.filtro.value;
    const valor = this.contenedorFormulario.controls.valor.value?.toLowerCase().trim();

    if (!filtro || !valor) {
      this.reportesFiltrados = [...this.reportes];
      return;
    }

    this.reportesFiltrados = this.reportes.filter(reporte => {
      if (filtro === 'tecnico') {
        return reporte.nombreTecnicoLinea?.toLowerCase().includes(valor);
      }
      if (filtro === 'fechaHora') {
        return reporte.fechaFormateada?.toLowerCase().includes(valor);
      }
      return false;
    });
  }

 

}
