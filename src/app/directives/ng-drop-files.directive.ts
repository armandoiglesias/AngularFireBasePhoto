import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';

import { FileItem } from '../models/file-items'


@Directive({
  selector: '[NgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];

  @Output() archivoSobre: EventEmitter<any> = new EventEmitter();

  constructor(public elemento: ElementRef) {

  }

  @HostListener('dragenter', ['$event'])
  public onDragEnter(event: any) {
    this.archivoSobre.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.archivoSobre.emit(false);
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: any) {

    let transfer = this._getTransferencal(event);
    transfer.dropEffect = 'copy';

    this._prevenirDetener(event);
    this.archivoSobre.emit(true);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event:any){

    let transfer = this._getTransferencal(event);
    if(!transfer){
      return
    }

    this._agregarArchivos(transfer.files);

    this.archivoSobre.emit(false);

    this._prevenirDetener(event);
  }

  private _getTransferencal(event:any){
    console.log(event);
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _agregarArchivos(archivos:FileList){
    

    for (let propiedad in Object.getOwnPropertyNames(archivos)) {
      let temporal = archivos[propiedad];
      if(this._archivoPuedeSerCargado(temporal)){
        let narchivo = new FileItem(temporal);
        this.archivos.push(narchivo);
      }

    }

    //console.log(this.archivos);
  }

  private _prevenirDetener(event:any){
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoSoltado(nombre:string):boolean{
    for (let i in this.archivos){
      let arch = this.archivos[i];
      if(arch.archivo.name === nombre){
        console.log("archivo ya existe");
        return true;
      }
    }

    return false;
  }

  private _esImagen(tipo:string):boolean{
    return (tipo == '' || tipo == undefined) ? false : tipo.startsWith("image")
  }

  private _archivoPuedeSerCargado(archivo:File){
    if (!this._archivoSoltado(archivo.name) && this._esImagen(archivo.type)){
      return true;
    }
    return false;
  }


}
