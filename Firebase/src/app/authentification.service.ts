import { Injectable, NgZone } from '@angular/core';
//import { auth } from 'firebase/app';

import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import "firebase/auth";
import { User } from 'firebase/auth';
import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  isAuth = false;
  userData: any;
  profile: any;
  idUser: any;
  listeUser: Observable<any[]>;
  itemsCollect: AngularFirestoreCollection;
  
  profile$:  Observable<User>;
  user : User;
  utilisateur: boolean;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    private firestore: AngularFirestore

   
  ) { 
        this.profile$ = this.ngFireAuth.authState
        .pipe(
          switchMap( user => {
            this.utilisateur = true;
            if(user)
            {
              return this.afStore.doc<User>(`user/${user.uid}`).valueChanges();
            }else{
              return of(null);
            }
          })
        )
  }


  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

   // Register user with email/password
   RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }

  signOut() {
    this.ngFireAuth.signOut();
    console.log(this.user);
  }

}
