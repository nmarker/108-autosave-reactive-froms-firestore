import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatGridListModule,
  MatRadioModule
} from '@angular/material';
import { FormDemoComponent } from './form-demo/form-demo.component';
import { FireFormDirective } from './fire-form.directive';

// Add your project credentials
const firebase = {
  apiKey: "AIzaSyAjU-xUFinMv34LwGnyB0V23r0mPQLIQHs",
  authDomain: "hiremuse-3da59.firebaseapp.com",
  databaseURL: "https://hiremuse-3da59.firebaseio.com",
  projectId: "hiremuse-3da59",
  storageBucket: "hiremuse-3da59.appspot.com",
  messagingSenderId: "590426111911"
};

@NgModule({
  declarations: [AppComponent, FormDemoComponent, FireFormDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatRadioModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
