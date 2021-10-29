import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable, of } from 'rxjs';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  //listeUser:  Observable<any[]>;;

  listeUser: Observable<any[]>;
  itemsCollect: AngularFirestoreCollection
 

  isAuth = false;
  userData: any;
  idUser: any;
  user: any;

  constructor(
    public authService: AuthentificationService,
    public router: Router,
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,

  ) {
      
   }

  ngOnInit() {
    this.getUserData();
    this.authService.profile$.subscribe(user=>{
      this.user = user;
    })
  }


  async getUserData(){
    console.log(this.authService.utilisateur);
    if(this.authService.utilisateur == true){
      this.itemsCollect = this.afStore.collection('user'); 
      //donnee la collection user à itemCollect     
      this.listeUser = this.itemsCollect.valueChanges(); 
      console.log(this.listeUser); 
    }else{
      this.router.navigateByUrl('/home');
    }
  
  }
  

}
