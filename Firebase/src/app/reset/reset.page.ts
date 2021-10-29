import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
  log = {ancPassword: '', nouvPassword: '', confnouvPassword: ''};
  user: any;
  constructor(
    public ngFireAuth: AngularFireAuth,
    public firestore: AngularFirestore
  ) { }

  ngOnInit() {
  }


  onReset(form: NgForm){
    if(form.value['ancPassword']!='' && form.value['nouvPassword']!='' && form.value['confnouvPassword']!='' ){
      this.ngFireAuth.authState.subscribe(auth =>{
        console.log(auth);
        if(auth){
          this.firestore.collection('user').doc(auth.uid).valueChanges().subscribe(result => {
            this.user = result;
            console.log(this.user);
            if(this.user.userPassword == form.value['ancPassword']){
              if(form.value['nouvPassword'] == form.value['confnouvPassword'] ){
                console.log(form.value['nouvPassword']);
                auth.updatePassword(form.value['nouvPassword']);
                window.alert('ok password change');
              }else{
                console.log("le nouveau mot de passe et l'ancien sont different");
              }
            }else {
              console.log("Ancien mot de passe incorrecte");
            }
          });
        }else{
          console.log("non encore connecter");
        }
      })
    }else{
      console.log(" vous n'etes pas connecter");
    }
  }

}
