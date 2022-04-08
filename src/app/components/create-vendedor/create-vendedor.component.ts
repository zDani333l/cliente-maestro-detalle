import { VendedorService } from './../../services/vendedor.service';
import { IVendedor } from './../../models/interface/IVendedor';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from 'src/app/services/alert.service';
import { ICiudad } from 'src/app/models/interface/ICiudad';
import { Observable } from 'rxjs';
import {
  selectCiudades,
  selectLoading,
} from 'src/app/state/selector/ciudad.selector';
import { Store } from '@ngrx/store';
import {
  LoadCreateVendedor,
  LoadUpdateVendedor,
} from 'src/app/state/actions/vendedor.actions';

@Component({
  selector: 'app-create-vendedor',
  templateUrl: './create-vendedor.component.html',
  styleUrls: ['./create-vendedor.component.scss'],
})
export class CreateVendedorComponent implements OnInit {
  register: FormGroup;
  txtButton = 'Registrar';
  title = 'Registrar vendedor';

  Ciudades$: Observable<ICiudad[]> = new Observable();
  loading$: Observable<boolean> = new Observable();
  @Input() vendedor: IVendedor;
  stateForm: boolean;

  @Output() exitModal = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private store: Store,
    private vendedorService: VendedorService
  ) {
    this.Ciudades$ = this.store.select(selectCiudades);
    this.loading$ = this.store.select(selectLoading);

    this.stateForm = JSON.parse(sessionStorage.getItem('stateForm'));
    this.vendedor = JSON.parse(sessionStorage.getItem('vendedor'));
  }

  exit() {
    this.exitModal.emit('exit');
  }

  ngOnInit() {
    this.register = this.formBuilder.group({
      id: [],
      nombre: [
        '',
        [
          Validators.minLength(4),
          Validators.required,
          Validators.pattern('[a-zA-ZÀ-ž ]+'),
        ],
      ],
      apellido: [
        '',
        [
          Validators.minLength(4),
          Validators.required,
          Validators.pattern('[a-zA-ZÀ-ž ]+'),
        ],
      ],
      numeroIdentificacion: [
        '',
        [
          Validators.min(1000),
          Validators.required,
          Validators.pattern('[0-9]+'),
        ],
      ],
      idCiudad: ['', [Validators.required]],
    });

    if (!this.stateForm) {
      this.register.get('id').setValue(this.vendedor.id);
      this.register.get('nombre').setValue(this.vendedor.apellido);
      this.register.get('apellido').setValue(this.vendedor.apellido);
      this.register
        .get('numeroIdentificacion')
        .setValue(this.vendedor.numeroIdentificacion);
      this.register.get('idCiudad').setValue(this.vendedor.idCiudad);
      this.txtButton = 'Actualizar';
      this.title = 'Actualizar vendedor';
    }
  }

  onSubmit() {
    if (!this.stateForm && this.register.valid) {
      const vendedor: IVendedor = this.register.value;
      this.store.dispatch(LoadUpdateVendedor({ vendedor }));
      this.exitModal.emit();
    } else if (this.register.valid) {
      const vendedor: IVendedor = this.register.value;
      vendedor.id = 0;
      this.store.dispatch(LoadCreateVendedor({ vendedor }));
      this.exitModal.emit();
    } else {
      this.alertService.presentAlert(
        '¡ATENCIÓN!',
        'Por favor revisar los campos ingresados'
      );
    }
  }

  getErrorMessage(field: string): string {
    let message = '';
    if (this.register.get(field).errors?.required) {
      message = 'Este campo es requerido';
    } else if (this.register.get(field).hasError('pattern')) {
      message = `Este campo no es válido`;
    } else if (this.register.get(field).hasError('minlength')) {
      const minLength =
        this.register.get(field).errors?.minlength.requiredLength;
      message = `Minimo ${minLength} caracteres`;
    } else if (
      this.register.get(field).hasError('min') &&
      field === 'documento'
    ) {
      message = 'Numero de documento no válido';
    } else if (
      this.register.get(field).hasError('min') ||
      (this.register.get(field).hasError('max') && field === 'edad')
    ) {
      message = 'Edad no válida';
    } else if (this.register.get(field).hasError('email')) {
      message = 'Email incorrecto';
    }
    return message;
  }

  isValidField(name: string): boolean {
    const fieldName = this.register.get(name);
    return fieldName.invalid && (fieldName.dirty || fieldName.touched);
  }
}
