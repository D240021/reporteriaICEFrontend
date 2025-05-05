import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'no-autorizado',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './no-autorizado.component.html',
  styleUrl: './no-autorizado.component.css'
})
export class NoAutorizadoComponent implements OnInit {

  public direccionAnterior: string = '';

  constructor() { }
  ngOnInit(): void {

  }

}
