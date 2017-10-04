import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule} from '@angular/http';
import { FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { CargaComponent } from './components/carga/carga.component';
import { FotosComponent } from './components/fotos/fotos.component';

import {  APP_ROUTING} from './app.routes';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

// servicios
import { CargaimagenesService } from './services/cargaimagenes.service';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive'

@NgModule({
  declarations: [
    AppComponent,
    CargaComponent,
    FotosComponent,
    NgDropFilesDirective
  ],
  imports: [
    BrowserModule, APP_ROUTING, HttpModule, FormsModule
    ,   AngularFireModule.initializeApp(environment.firebase)
    ,AngularFireDatabaseModule
  ],
  providers: [
    CargaimagenesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
