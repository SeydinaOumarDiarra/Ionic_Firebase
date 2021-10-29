import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any;
  constructor(
    public authService: AuthentificationService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.authService.profile$.subscribe(user=>{
    this.user = user;
    })
  }

}
