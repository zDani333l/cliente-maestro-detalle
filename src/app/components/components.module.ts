import { ButonTemplateSecondaryComponent } from './buton-template-secondary/buton-template-secondary.component';
import { TableCiudadesComponent } from './table-ciudades/table-ciudades.component';
import { CreateCiudadComponent } from './create-ciudad/create-ciudad.component';
import { ButtonTempletePrimaryComponent } from './button-templete-primary/button-templete-primary.component';
import { CreateVendedorComponent } from './create-vendedor/create-vendedor.component';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaVendedoresComponent } from './tabla-vendedores/tabla-vendedores.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingXModule } from 'ngx-loading-x';

@NgModule({
  declarations: [
    NavbarComponent,
    TablaVendedoresComponent,
    CreateVendedorComponent,
    ButtonTempletePrimaryComponent,
    CreateCiudadComponent,
    TableCiudadesComponent,
    ButonTemplateSecondaryComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingXModule,
  ],
  exports: [
    NavbarComponent,
    TablaVendedoresComponent,
    CreateVendedorComponent,
    ButtonTempletePrimaryComponent,
    CreateCiudadComponent,
    TableCiudadesComponent,
    ButonTemplateSecondaryComponent,
  ],
})
export default class ComponentsModule {}
