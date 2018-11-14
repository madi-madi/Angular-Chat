import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import { User } from '../core/user';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
user : User = new User();
  constructor(
    // public userService: UserService,
    public authService: AuthService,
    public userService: UserService,
    private route: ActivatedRoute,
    private location : Location,
  	) { }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      // console.info('Current user - '+JSON.stringify(this.authService.getUserAuth()));
      // console.info(''+JSON.stringify(this.userService.getCurrentUser()));

      let data = JSON.stringify(this.authService.getUserAuth());
      // console.info(''+JSON.stringify(this.authService.user));
      if (data) {
        this.user = data;
        // console.info('USer Data '+ this.user);
        // this.createForm(this.user.name);
      }
    })
  }
  save(value){
    this.userService.updateCurrentUser(value).then(
      res=>{console.info('Updated User'+ res);},
      err=>{
        console.warn('Error update usser ' + err)
      }

      )
  }
  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }

}
