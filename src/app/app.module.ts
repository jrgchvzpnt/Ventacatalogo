import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { ProductoService } from './producto.service'; // Importar el servicio ProductoService


import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';



import { AppComponent } from './app.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    AgregarProductoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule ,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    
  ],
  providers: [
    ProductoService // Asegurarse de que el servicio ProductoService esté proporcionado aquí
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
