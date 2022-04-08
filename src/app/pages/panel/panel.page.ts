import { CreateCiudadComponent } from './../../components/create-ciudad/create-ciudad.component';
import { IVendedor } from './../../models/interface/IVendedor';
import { selectCiudades } from './../../state/selector/ciudad.selector';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ICiudad } from 'src/app/models/interface/ICiudad';

import { ModalController } from '@ionic/angular';

import { CreateVendedorComponent } from '../../components/create-vendedor/create-vendedor.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import {
  LoadCreateCiudad,
  LoadUpdateCiudad,
} from 'src/app/state/actions/ciudad.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { selectVendedores } from 'src/app/state/selector/vendedor.selector';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage implements OnInit {
  listCiudades$: Observable<ICiudad[]> = new Observable();
  listVendederes$: Observable<IVendedor[]> = new Observable();
  list;
  load = false;
  title = '';
  txtButton = '';
  success = false;

  currentModal = null;
  public stateForm = true;
  public isModalOpen = false;

  state = false;
  stateFormVendedor: boolean;
  register: FormGroup;

  constructor(
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private modalService: NgbModal
  ) {
    this.listCiudades$ = this.store.select(selectCiudades);
    this.listVendederes$ = this.store.select(selectVendedores);
  }

  async presentModalq() {
    const modal = await this.modalCtrl.create({
      component: CreateVendedorComponent,
    });
    await modal.present();
    this.currentModal = modal;
  }

  openModalCreateVendedor() {
    sessionStorage.setItem('stateForm', JSON.stringify(true));
    this.presentModalq();
    this.success = true;
  }

  exitModal() {
    if (this.currentModal) {
      this.currentModal.dismiss().then(() => {
        this.currentModal = null;
      });
    }
  }
  editCiudad(ciudad: ICiudad, modal: any) {
    this.stateFormVendedor = false;
    this.title = 'Editar Ciudad';
    this.txtButton = 'Editar';
    this.modalService.open(modal, {
      scrollable: true,
      animation: true,
      centered: true,
    });

    this.register.get('descripcion').setValue(ciudad.descripcion);
    this.register.get('id').setValue(ciudad.id);
    this.success = true;
  }

  uptVend(vendedor: IVendedor) {
    this.success = true;
    sessionStorage.setItem('stateForm', JSON.stringify(!this.stateForm));

    this.presentModalq();
  }

  goToV() {
    this.router.navigate(['panel', 2]);
  }

  createCiudad(ciudad: any) {
    this.stateFormVendedor = true;
    this.title = 'Crear Ciudad';
    this.txtButton = 'Crear';
    this.modalService.open(ciudad, {
      scrollable: true,
      animation: true,
      centered: true,
    });
    this.success = true;
  }

  goToNextPage() {
    this.router.navigate(['panel', 1]);
  }

  ngOnInit() {
    this.listVendederes$.subscribe(() => {
      this.exitModal();
      if (this.success) {
        this.alertService.presentAlert(
          'SUCCESS!',
          'Acción realizada con exito'
        );
        this.success = false;
      }
    });

    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const param = params.get('id');
        if (param === '2') {
          this.state = false;
        } else if (param === '1') {
          this.state = true;
          this.register = this.formBuilder.group({
            id: [],
            descripcion: [
              '',
              [
                Validators.minLength(4),
                Validators.required,
                Validators.pattern('[a-zA-ZÀ-ž ]+'),
              ],
            ],
          });
        } else {
          this.router.navigate(['panel', 1]);
        }
      } else {
        this.router.navigate(['panel', 1]);
      }
    });
  }

  onSubmit() {
    if (!this.stateFormVendedor && this.register.valid) {
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
    this.modalService.dismissAll();
    if (this.success) {
      this.alertService.presentAlert('SUCCESS!', 'Acción realizada con exito');
      this.success = false;
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
