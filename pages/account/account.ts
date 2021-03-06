import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { Http } from '@angular/http';
import { ProfilePage } from '../profile/profile';
import { AddListingPage } from '../add-listing/add-listing';
import { ViewListingsPage } from '../view-listings/view-listings';

/*
  Generated class for the Account page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  token:string; user:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public platform: Platform, public http: Http) {
    this.user={
          firstName:"",
          lastName:"",
          profilePicture:""
    }
    this.storage.get('token').then((val) => {
      this.token = val;
   

    var link = 'http://139.59.5.156/test/viewProfile.php';
    var dataa = JSON.stringify({
      token : this.token
    });

    this.http.post(link,dataa).map(res => res.json()).subscribe((data)=> {
      this.user = data;
      this.user.profilePicture = "http://139.59.5.156/test/uploads/" + this.user.profilePicture;
    });

     });
  }
  ionViewDidLoad() {
    
  }

  logout() {
    this.storage.set('token',null);
    this.platform.exitApp();
    // this.navCtrl.remove(1,this.navCtrl.length()-2);
    // this.navCtrl.pop();
  }
  

  viewProfile() {
    this.navCtrl.push(ProfilePage);
  }

  addListing() {
    this.navCtrl.push(AddListingPage);
  }

  viewListings() {
    this.navCtrl.push(ViewListingsPage);
  }
}
