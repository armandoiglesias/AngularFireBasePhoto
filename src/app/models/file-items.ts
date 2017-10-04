export class FileItem{
    public archivo:File;
    public nombre:string;
    public url:string = "";
    public estadoSubiendo:boolean;
    public progreso:number = 0;

    constructor(archivo:File){
        this.archivo = archivo;
        this.nombre = archivo.name;
    }
}