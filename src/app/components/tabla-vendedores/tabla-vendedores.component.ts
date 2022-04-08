import {
  selectVendedores,
  selectLoadingVendedor,
} from './../../state/selector/vendedor.selector';
import { IVendedor } from './../../models/interface/IVendedor';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  LoadDeleteVendedor,
  LoadVendedores,
} from 'src/app/state/actions/vendedor.actions';

@Component({
  selector: 'app-tabla-vendedores',
  templateUrl: './tabla-vendedores.component.html',
  styleUrls: ['./tabla-vendedores.component.scss'],
})
export class TablaVendedoresComponent implements OnInit {
  listVendedores$: Observable<IVendedor[]> = new Observable();
  loading$: Observable<boolean> = new Observable();

  @Output() modifyVendedor = new EventEmitter<IVendedor>();

  constructor(private store: Store) {
    this.listVendedores$ = this.store.select(selectVendedores);
    this.loading$ = this.store.select(selectLoadingVendedor);
  }

  deleteVendedor(id: number) {
    this.store.dispatch(LoadDeleteVendedor({ vendedorId: id }));
  }
  updateVendedor(vendedor: IVendedor) {
    sessionStorage.setItem('vendedor', JSON.stringify(vendedor));
    sessionStorage.setItem('stateForm', JSON.stringify(false));
    this.modifyVendedor.emit(vendedor);
  }

  onSort(evenet) {}

  ngOnInit() {
    this.store.dispatch(LoadVendedores());
  }
}
