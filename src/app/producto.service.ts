import { Injectable } from '@angular/core';

import { Producto } from './lista-productos/lista-productos.component';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productoSeleccionado: Producto | null = null;

  constructor() { }

  setProductoSeleccionado(producto: Producto): void {
    this.productoSeleccionado = producto;
  }

  getProductoSeleccionado(): Producto | null {
    return this.productoSeleccionado;
  }

  clearProductoSeleccionado(): void {
    this.productoSeleccionado = null;
  }
}