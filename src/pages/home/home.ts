import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

import {LoginPage } from '../login/login'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
nombre:string;
 codigo:string;

  constructor(public navCtrl: NavController, public navP: NavParams,   public auth : AuthProvider, private dbFirebase :FirebaseDbProvider, private qrScanner: QRScanner) {
    this.nombre = this.navP.get("nombre");

  }
  cerrarSesion()
  {
    this.auth.logout();
  }
  guardarCarga()
  {
     
    let persona = {nombre:"facundo", edad:26};
    this.dbFirebase.guardaCarga(persona).then(res=>{console.log('carga guardada en firebase:');
    })
  }
  
  verCargas()
  {
    this.dbFirebase.getCargas().subscribe(cargas=>{
      console.log(cargas);
    })
  }
  Escanear()
  {
        // Pedir permiso de utilizar la camara
      this.qrScanner.prepare().then((status: QRScannerStatus) => {
        if (status.authorized) {
          // el permiso fue otorgado
          // iniciar el escaneo
         let scanSub = this.qrScanner.scan().subscribe((texto: string) => {
            console.log('Scanned something', texto);
            this.codigo =texto;
            this.qrScanner.hide(); // esconder el preview de la camara
            scanSub.unsubscribe(); // terminar el escaneo
          }); 
    
        } else if (status.denied) {
          // el permiso no fue otorgado de forma permanente
          // debes usar el metodo QRScanner.openSettings() para enviar el usuario a la pagina de configuracion
          // desde ahí podrán otorgar el permiso de nuevo
        } else {
          // el permiso no fue otorgado de forma temporal. Puedes pedir permiso de en cualquier otro momento
        }
      }) .catch((e: any) => console.log('El error es: ', e));

     this.qrScanner.show().then(()=>{

      (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');

     })
    }
  }

