import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { AuthentificationService } from './authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  navigate: any;
  auth: any;
  constructor(
    platform: Platform,
    public authService: AuthentificationService,
    public router: Router,
    public alertController: AlertController,
    private loading: LoadingController,
  ) {
    this.sideMenu();
  }


  sideMenu(){
    this.navigate = [
      {
        title : "Home",
        icon: "Home",
        url : "/accueil"
      },
      {
        title : "Profile",
        icon:  "person-circle-outline",
        url : "/profile"
      },
      {
        title : "Search",
        icon:  "search",
        url : "/search"
      },
      {
        title : "Reset Password",
        icon:  "bag-handle-outline",
        url : "/reset"
      },
      {
        title : "Logout",
        icon: "log-out-outline",
        url : "/home"
      },
      
    ]
  }

  async deconnexion(){
    this.auth = this.authService.signOut();
     this.router.navigate(['/home']);
    
  }
}
