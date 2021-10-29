import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {
  log = {email: ''};
  submitted = false;
  error = '';
  constructor(
    private loading: LoadingController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header:'alert',
      subHeader: 'Connexion échouée',
      message: 'Un lien de récuperatation a été envoyé à votre email !',
      buttons: ['ok']
    });
    await alert.present();
  }

  async onRecovery(form: NgForm){
    const load = await this.loading.create({
      message: 'Patientez...',
      backdropDismiss: false,
      mode: 'ios'
  });
  await load.present();
  if(form.value['email'] != ''){
    load.dismiss();
    this.presentAlert();
  }
  }
  

}
