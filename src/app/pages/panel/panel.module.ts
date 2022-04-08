import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanelPageRoutingModule } from './panel-routing.module';

import { PanelPage } from './panel.page';
import { NgxLoadingXModule } from 'ngx-loading-x';
import ComponentsModule from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelPageRoutingModule,
    ComponentsModule,
    NgxLoadingXModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [PanelPage],
})
export class PanelPageModule {}
