import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { ProductoService } from '../producto.service'; // Importar el servicio ProductoService





interface TipoProducto {
  id: number;
  nombreTipoProducto: string;
}

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  nuevoProducto: FormGroup = new FormGroup({}); // Inicializamos con un valor por defecto
  tiposProductos: TipoProducto[] = [];

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private productoService: ProductoService){ }

  ngOnInit(): void {
    this.initForm();
    this.obtenerTiposProductos();
    this.cargarProductoSeleccionado(); // Cargar el producto seleccionado en el formulario

  }

  initForm() {
    this.nuevoProducto = new FormGroup({
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
      this.nuevoProducto.patchValue(productoSeleccionado);
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

  agregarProducto() {
    if (this.nuevoProducto.invalid) {
       // Si el formulario es inválido, mostrar el mensaje de error como popup
      const config: MatSnackBarConfig = {
        duration: 3000, // Duración en milisegundos (3 segundos en este caso)
      };
      this.snackBar.open('Completa todos los campos requeridos', 'Cerrar', config);
      return;
    }
    // Llamar al método post del HttpClient para enviar la solicitud POST
    this.http.post<any>('https://localhost:7099/api/Productos', this.nuevoProducto.value).subscribe(
      (response) => {
        // Aquí puedes manejar la respuesta si es necesario
        console.log('Producto agregado con éxito:', response);
        this.tiposProductos = response;
      },
      (error) => {
        // Manejar el error si ocurrió algún problema al agregar el producto
        console.error('Error al agregar el producto:', error);
      }
    );
  }
}
