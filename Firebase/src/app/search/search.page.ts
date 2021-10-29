import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
 
  userList: any[];
  userSave: any[];

  constructor(   
     public afStore: AngularFirestore,
    ) { }

  ngOnInit() {
    this.afStore.collection('user').valueChanges().subscribe(getList =>{
      this.userList = getList;
      this.userSave = getList
    })
  }

  async initUser(): Promise<any> {
    this.userList= this.userSave;
  }

  async filterList(evt) {
    this.initUser();
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }

    this.userList = this.userList.filter(search => {
      if (search.name && searchTerm) {
        if(search.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
    });
  }


 
}
