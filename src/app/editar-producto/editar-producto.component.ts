import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { ProductoService } from '../producto.service'; // Importar el servicio ProductoService

interface Producto {
  id: number;
  nombreProducto: string;
  descripcionProducto: string;
  precio: number;
  existencia: number;
  tipoProducto_Id: number;
  fechaRegistro: Date;
  fechaEliminado?: Date;
}

interface TipoProducto {
  id: number;
  nombreTipoProducto: string;
}

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  productoId!: number; // Añadimos el signo de exclamación (!) para indicar que se inicializará en ngOnInit
  producto!: Producto; // Añadimos el signo de exclamación (!) para indicar que se inicializará en ngOnInit
  tiposProductos: TipoProducto[] = [];
  editarProductoForm!: FormGroup; // Añadimos el signo de exclamación (!) para indicar que se inicializará en ngOnInit

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.productoId = +this.route.snapshot.paramMap.get('id')!; // Agregamos el signo de exclamación (!) para indicar que el resultado no es nulo
    this.initForm();
    this.obtenerTiposProductos();
    this.cargarProductoSeleccionado();
  }

  initForm() {
    this.editarProductoForm = new FormGroup({
      nombreProducto: new FormControl('', [Validators.required]),
      descripcionProducto: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required, Validators.min(0)]),
      existencia: new FormControl('', [Validators.required, Validators.min(0)]),
      tipoProducto_Id: new FormControl(null, [Validators.required]),
      fechaRegistro: new FormControl('', [Validators.required]),
      fechaEliminado: new FormControl('')
    });
  }

  cargarProductoSeleccionado() {
    const productoSeleccionado = this.productoService.getProductoSeleccionado();
    if (productoSeleccionado) {
      this.editarProductoForm.patchValue(productoSeleccionado);
    }
  }

  obtenerTiposProductos() {
    this.http.get<TipoProducto[]>('https://localhost:7099/api/TiposProductos').subscribe(
      (data) => {
        this.tiposProductos = data;
      },
      (error) => {
        console.error('Error al obtener los tipos de productos:', error);
      }
    );
  }

  guardarCambios() {
    if (this.editarProductoForm.invalid) {
      const config: MatSnackBarConfig = {
        duration: 3000
      };
      this.snackBar.open('Completa todos los campos requeridos', 'Cerrar', config);
      return;
    }

    const productoActualizado = { ...this.editarProductoForm.value, id: this.productoId };
    this.http.put<any>('https://localhost:7099/api/Productos', productoActualizado).subscribe(
      (response) => {
        console.log('Producto actualizado con éxito:', response);
        // Redirigir al usuario a la lista de productos después de actualizar el producto
        // (Asegúrate de que el enrutador esté configurado correctamente para esta redirección)
      },
      (error) => {
        console.error('Error al actualizar el producto:', error);
      }
    );
  }
}
