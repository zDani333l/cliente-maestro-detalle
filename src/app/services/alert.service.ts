import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(public alertController: AlertController) {}

  async presentAlert(title: string, mesagge: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: titulo,
      subHeader: title,
      message: mesagge,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
