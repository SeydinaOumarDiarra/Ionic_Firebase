import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  log = {name: '', tel: '', email: '', password: ''};
  submitted = false;
  error = '';
  profile: any;
  constructor(
    public authService: AuthentificationService,
    public router: Router,
    private firestore: AngularFirestore,
    private loading: LoadingController,
    public alertController: AlertController,

  ) { }

  ngOnInit() {
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header:'alert',
      subHeader: 'Connexion échouée',
      message: 'Email existe déjà !',
      buttons: ['ok']
    });
    await alert.present();
  }

  async presentAlert2(){
    const alert = await this.alertController.create({
      header:'alert',
      subHeader: 'Inscription reussi',
      message: 'Votre inscription a été soumise avec succès !',
      buttons: ['ok']
    });
    await alert.present();
  }

  async onSign(form: NgForm){
    const load = await this.loading.create({
      message: 'Patientez...',
      backdropDismiss: false,
      mode: 'ios'
  });
  await load.present();
    this.authService.RegisterUser(form.value["email"], form.value["password"])      
      .then((res) => {
        if(res){
          load.dismiss();
          this.profile = this.firestore.collection('user').doc(res.user.uid).set({
            'name': form.value["name"],
            'tel' : form.value["tel"],
            'email': res.user.email
          });

          this.presentAlert2();
          //window.alert("Vous êtes inscrit avec succès !")   
        }
        
      }).catch((error) => {
        //window.alert(error.message)
        load.dismiss();
        this.presentAlert();
      })
  }

}
