import { Component, OnInit } from '@angular/core';

import { CargaimagenesService} from '../../services/cargaimagenes.service'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: []
})
export class FotosComponent implements OnInit {

  imagenes:FirebaseListObservable<any[]>;
  constructor(public _cs:CargaimagenesService) { 
    this.imagenes = this._cs.listarUltimasImagenes(10);
  }

  ngOnInit() {
  }

}
