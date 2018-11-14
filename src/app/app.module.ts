import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//  auth service ism
// import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { ImageCropperModule } from 'ngx-image-cropper';
// import { LoginComponent } from './login/login.component';
// import { UserComponent } from './user/user.component';
// import { RegisterComponent } from './register/register.component';
// import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  RouterModule.forRoot(rootRouterConfig, { useHash: false }),
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule, // imports firebase/firestore, only needed for database features
  AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  AngularFireStorageModule,
  ImageCropperModule,
  ],
  // add auth service in prioviders
  providers: [AuthService,AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
