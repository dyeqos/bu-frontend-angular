import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { clientsRoutingModule } from './clients-routing.module';
import { CuentasComponent } from './pages/cuentas/cuentas.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { MainComponent } from './pages/main/main.component';


@NgModule({
  declarations: [
    CuentasComponent,
    ClientesComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    clientsRoutingModule,
    ReactiveFormsModule
  ]
})
export class clientsModule { }
