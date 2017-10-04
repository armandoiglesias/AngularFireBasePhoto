import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-items'
import { CargaimagenesService } from '../../services/cargaimagenes.service'

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  estaSobreDropZone:boolean = false;
  permiteCargar:boolean = true;
  archivos:FileItem[]= [];

  constructor(public _cs:CargaimagenesService) { }

  ngOnInit() {
  }

  limpiarArchivos(){
    this.archivos = [];
    this.permiteCargar = true;

  }

  cargarImagenesFirebase(){
   this.permiteCargar = false;
   this._cs.cargarImageneFirebase(this.archivos);
  }

  archivoSobreDropZone(e:boolean){
    //console.log(e);
    this.estaSobreDropZone = e;
  }

}
