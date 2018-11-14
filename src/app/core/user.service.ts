import { Injectable } from '@angular/core';
// import firebase|auth|firestore
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
// require('firebase/database')

import { AuthService } from './auth.service';

import "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class UserService {
public  imageChangedEvent: any = '';
public croppedImage: any = '';
public url : string;
// public  file:File;
  constructor(
   private db: AngularFirestore,
   private afAuth: AngularFireAuth,
  	) { }
  getCurrentUser(){
  	return new Promise<any>((resolve , reject)=>{
  		let user = firebase.auth().onAuthStateChanged(function(user){
          console.info(user);
  			
        if (user) {
          console.info(user);
  				resolve(user)
  				// code...
  			}else{
  				reject("No user Login in")
  			}
  		})
  	})
  }


fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    // const file:File = event.target.files[0];
  // console.info('Test Corp' +file);

}
imageCropped(image: string) {
    this.croppedImage = image;
}
imageLoaded() {
    // show cropper
}
loadImageFailed() {
    // show message
}


  updateCurrentUser(value){
    console.info('Update '+JSON.stringify(value) );
    // console.info('Test Corp' +this.file);
    console.info('Test    d '+ this.imageChangedEvent.target.files[0]);
    const file = this.imageChangedEvent.target.files[0];
    let fileName = file.name;
    const metaData = {'contentType':file.type}

    const storageRef: firebase.storage.Reference = firebase.storage()
    .ref('images/users/'+fileName);
    console.info(''+ storageRef);
   
    const uploadTask : firebase.storage.UploadTask = storageRef.put(file,metaData);
    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot)=>{
      console.log('Upload Completed');
      // const downloadUrl = uploadSnapshot.downloadURL;
      // let usersRef = firebase.database().ref('users');

      // console.log( ' ng-0  '+usersRef);
      // firebase.database().ref('images/users/'+fileName).set(uploadSnapshot.downloadURL);

    })
    storageRef.getDownloadURL().then(function(url){
    // console.info('Url --- '+ url);
   // this.url = url;
    }).catch(function(error) {
    // Handle any errors
    });
    // console.info(''+ this.url);
  	return new Promise<any>((resolve ,reject)=>{
  		let user = firebase.auth().currentUser;
       // console.info(''+this.authService.file);
  		user.updateProfile({
  			displayName:value.displayName,
  			photoURL:value.photoURL
  		}).then(res=>{resolve(res)},err=>{reject(err)})
  	})

  }
}
