import { LoadCiudades } from './../../state/actions/ciudad.actions';
import {
  selectCiudades,
  selectLoading,
} from './../../state/selector/ciudad.selector';
import { ICiudad } from './../../models/interface/ICiudad';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectVendedores } from 'src/app/state/selector/vendedor.selector';
import { IVendedor } from 'src/app/models/interface/IVendedor';

@Component({
  selector: 'app-table-ciudades',
  templateUrl: './table-ciudades.component.html',
  styleUrls: ['./table-ciudades.component.scss'],
})
export class TableCiudadesComponent implements OnInit {
  listCiudades$: Observable<ICiudad[]> = new Observable();
  listVendedores$: Observable<IVendedor[]> = new Observable();
  loading$: Observable<boolean> = new Observable();

  @Output() modifyCiudad = new EventEmitter<ICiudad>();

  constructor(private store: Store) {
    this.listCiudades$ = this.store.select(selectCiudades);
    this.loading$ = this.store.select(selectLoading);
    this.listVendedores$ = this.store.select(selectVendedores);
  }

  updateCiudad(ciudad: ICiudad) {
    this.modifyCiudad.emit(ciudad);
  }

  ngOnInit() {
    this.store.dispatch(LoadCiudades());
  }
}
