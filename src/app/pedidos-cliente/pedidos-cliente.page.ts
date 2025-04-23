import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../component/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pedidos-cliente',
  templateUrl: './pedidos-cliente.page.html',
  styleUrls: ['./pedidos-cliente.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, SharedModule, RouterModule]
})
export class PedidosClientePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}