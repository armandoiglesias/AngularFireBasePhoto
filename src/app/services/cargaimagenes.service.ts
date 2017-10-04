import { Injectable } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {FileItem  } from '../models/file-items';
import * as firebase from 'firebase';


@Injectable()
export class CargaimagenesService {

  private _FOLDER :string =  'img';
  constructor( public af:AngularFireModule, public db: AngularFireDatabase) { 
    
  }

  listarUltimasImagenes(num:number):FirebaseListObservable<any[]>{
    return this.db.list(`/${this._FOLDER}`, {
      query :{
        limitToLast : num 
      }
    })
  }

  cargarImageneFirebase(archivos:FileItem[]){
    console.log(archivos);

    let storageRef = firebase.storage().ref();
    for (let item of archivos) {
      item.estadoSubiendo = true;
      let uploadTask:firebase.storage.UploadTask = storageRef.child(`${this._FOLDER }/${item.nombre}`).put(item.archivo);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, 
        (
snapshot:firebase.storage.UploadTaskSnapshot)=> {
          console.log(snapshot);
          item.progreso = (snapshot.bytesTransferred  / snapshot.totalBytes ) * 100;
        }
        , (error) => console.error("error al subir", error)
        , () => {
          item.url = uploadTask.snapshot.downloadURL;
          item.estadoSubiendo = false;
          this.guardarImagen({
            nombre : item.nombre
            , url: item.url
          });
        }
      );
    }

  }

  private guardarImagen(imagen:any){
    this.db.list(`${this._FOLDER}`).push(imagen);
  }

}
