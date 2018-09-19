import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userActual:string = "";
passActual:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public alertctrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  setearUser(user, pass){
    this.userActual = user;
    this.passActual = pass;
  }

  login()
  {
      this.auth.loginUser(this.userActual,this.passActual ).then((user) => {
        }
      )
       .catch(err=>{
        let alert = this.alertctrl.create({
          title: 'Error',
          subTitle: err.message,
          buttons: ['Aceptar']
        });
        alert.present();
      })
    }
}
