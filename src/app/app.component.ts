import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { timer } from 'rxjs/observable/timer';
import { AuthProvider } from '../providers/auth/auth';

import {HomePage} from '../pages/home/home'; 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
showSplash = true;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,     private auth: AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false)

      this.auth.Session.subscribe(session=>{
        if(session){
            this.rootPage = HomePage;
        }
          else{
            this.rootPage = LoginPage;
          }
      });
    });
  }
}
