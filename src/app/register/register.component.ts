import { Component, OnInit } from '@angular/core';
//  import auth service , router , form 
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service'


import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public authService: AuthService,
    public userService: UserService,

    private router: Router,
    private fb: FormBuilder

  	) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
    email:new FormControl('',[
    Validators.required,
    Validators.email,
    ]),
    displayName:new FormControl('',[
    Validators.required,
    ]),
    photoURL:new FormControl('',[
    Validators.required,
    ]),
    password: new FormControl('',[
    Validators.required,
    Validators.minLength(6)
    ]),

    });


  }


     tryRegister(value){
     this.authService.doRegister(value)
     .then(res => {
       console.log(res);
       //  auto login after doregister
       this.authService.doLogin(value) 
       this.errorMessage = "";
       this.successMessage = "Your account has been created";
       // auto route user
      this.router.navigate(['/user']);

     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
   }


}
