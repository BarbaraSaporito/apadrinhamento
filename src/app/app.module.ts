import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { PadrinhoCardComponent } from './padrinho-card/padrinho-card.component';
import { LoginComponent } from './login/login.component';

// Material
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

//FireBase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/compat/database'
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthService } from './services/auth.service';
import { Subject } from 'rxjs';
import { AuthGuardService } from './guards/auth-guard.service';
import { RouterModule } from '@angular/router';
import { FinalComponent } from './final/final.component';
// import { AuthComponent } from './guards/auth/auth.component';


@NgModule({
  declarations: [
    AppComponent,
    PadrinhoCardComponent,
    LoginComponent,
    ConfirmDialogComponent,
    FinalComponent,
    // AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSnackBarModule

  ],
  providers: [
    AuthGuardService,
    Subject,
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule],

})
export class AppModule { }
