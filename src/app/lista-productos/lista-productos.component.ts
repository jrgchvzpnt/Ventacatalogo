import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

import { ProductoService } from '../producto.service'; // Importar el servicio



import { Router } from '@angular/router'; // Importar el Rout



export interface Producto {
  id: number;
  nombreProducto: string;
  descripcionProducto: string;
  precio: number;
  existencia: number;
  fechaRegistro: Date;
}

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  productos: Producto[] = [];
  dataSource: MatTableDataSource<Producto>;

  // Definición de las columnas de la tabla
  columnas: string[] = ['id', 'nombreProducto', 'descripcionProducto', 'precio', 'existencia', 'actions'];

  constructor(private http: HttpClient,private router: Router, private productoService: ProductoService) {
    this.dataSource = new MatTableDataSource(this.productos);
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  

  editarProducto(id: number) {
    // Navega a la página de edición del producto con su ID
    this.router.navigateByUrl(`/editar-producto/${id}`);
  }

  eliminarProducto(id: number) {
    this.http.delete(`https://localhost:7099/api/Productos/${id}`).subscribe(
      () => {
        // Si la solicitud DELETE fue exitosa, eliminamos el producto de la lista local
        this.productos = this.productos.filter((producto) => producto.id !== id);
      },
      (error) => {
        console.error('Error al borrar el producto:', error);
      }
    );
  }

  obtenerProductos() {
    this.http.get<Producto[]>('https://localhost:7099/api/Productos').subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }
}
