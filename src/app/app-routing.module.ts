import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';




// Importa el componente AgregarProductoComponent

const routes: Routes = [
  { path: '', redirectTo: '/lista-productos', pathMatch: 'full' },
  { path: 'lista-productos', component: ListaProductosComponent },
  { path: 'agregar-producto', component: AgregarProductoComponent },
  { path: 'editar-producto/:id', component: EditarProductoComponent }
 
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
