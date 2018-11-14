import { Injectable } from '@angular/core';

import {Observable,fromEvent ,Subscription , interval } from 'rxjs';
import { map ,debounceTime,filter } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from './user';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
public isSignedInStream :Observable<boolean>;
public user: User = new User();

  constructor(private afAuth : AngularFireAuth,
   private userService : UserService) {
    this.afAuth.authState.subscribe((user:firebase.User)=>{
      if (user) {
        // code...
        // console.info('User Is Signed As'+ JSON.stringify(user));
        this.user = user
      }else{
        // code...
        console.info('User Is Signed Out');
      }
    });

    this.isSignedInStream = this.afAuth.authState
    .pipe(map<firebase.User , boolean>((user: firebase.User)=>{
      return user != null;
    })); 


   }

  
  doRegister(value){
    console.info(''+JSON.stringify(value.photoURL.type));
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        this.userService.updateCurrentUser(value)
        resolve(res);
      }, err => reject(err))
    })
  }

 getUserAuth():any{
       this.afAuth.authState.subscribe((user:firebase.User)=>{
      if (user) {
        // code...
        console.info('User Is Signed As'+ JSON.stringify(user));
      this.user = JSON.stringify(user);
      }else{
        // code...
        console.info('User Is Signed Out');
      }
    });
       return this.user

}
  doLogin(value){
  	 return new Promise<any> ((resolve , reject)=> {
  	 	firebase.auth().signInWithEmailAndPassword(value.email,value.password).
  	 	then( res=> {
  	 		resolve(res);
  	 	}, err=>reject(err))

  	 })
  }

  doLogout(){
  	return new Promise<any>((resolve ,reject)=>{
  		if (firebase.auth().currentUser) {
  			this.afAuth.auth.signOut();
  			resolve();
  		}else{
  			reject();
  		}
  	});
  }


}
