import {
  LoadCreateCiudad,
  LoadUpdateCiudad,
} from './../../state/actions/ciudad.actions';
import { ICiudad } from './../../models/interface/ICiudad';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AlertService } from 'src/app/services/alert.service';
import { selectLoading } from 'src/app/state/selector/ciudad.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ciudad',
  templateUrl: './create-ciudad.component.html',
  styleUrls: ['./create-ciudad.component.scss'],
})
export class CreateCiudadComponent implements OnInit {
  register: FormGroup;
  txtButton = 'Registrar';
  title = 'Registrar ciudad';
  stateForm: boolean;
  @Input() ciudad: ICiudad;

  loading$ = this.store.select(selectLoading);

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private store: Store
  ) {
    this.stateForm = JSON.parse(sessionStorage.getItem('stateFormCiudad'));
    if (!this.stateForm) {
      this.txtButton = 'Actualizar';
      this.title = 'Actualizar ciudad';
    }
  }

  async ngOnInit() {
    this.register = this.formBuilder.group({
      id: [],
      Descripcion: [
        '',
        [
          Validators.minLength(4),
          Validators.required,
          Validators.pattern('[a-zA-ZÀ-ž ]+'),
        ],
      ],
    });
  }

  onSubmit() {
    if (!this.stateForm && this.register.valid) {
      const ciudad: ICiudad = this.register.value;
      this.store.dispatch(LoadUpdateCiudad({ ciudad }));
    } else if (this.register.valid) {
      const ciudad: ICiudad = this.register.value;
      ciudad.id = 0;
      this.store.dispatch(LoadCreateCiudad({ ciudad }));
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
