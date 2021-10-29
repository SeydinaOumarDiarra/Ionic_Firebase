import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthentificationService } from '../authentification.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { async } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  login = {email: '', password: ''};
  submitted = false;
  error = '';
  profile : any;

  constructor(
   // private http: HttpClient,
   public authService: AuthentificationService,
   private loading: LoadingController,
   public router: Router,
   private firestore: AngularFirestore,
   public alertController: AlertController,

  ) {
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header:'alert',
      subHeader: 'Connexion échouée',
      message: 'Identifiant incorrect !',
      buttons: ['ok']
    });
    await alert.present();
  }

  async onLogin(form: NgForm){
    const load = await this.loading.create({
      message: 'Patientez...',
      backdropDismiss: false,
      mode: 'ios'
  });
  await load.present();
    this.authService.SignIn(form.value["email"], form.value["password"])      
    .then((res) => {
        load.dismiss();
        //console.log(res);
        this.router.navigate(['/accueil']);
      
        
        }).catch((error) => {
        load.dismiss();
      this.presentAlert();
    })
   
  }


  async onSign(){
    this.router.navigate(['/inscription']);
  }

  async recovery(){
    this.router.navigate(['/recovery']);
  }

}
