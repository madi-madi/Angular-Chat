import { Component, OnInit } from '@angular/core';
//  import 
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	errorMessage:string = '';


  constructor(
  	private authService : AuthService,
  	private fb :FormBuilder,
  	private router :Router
  	) { 
    //this.createForm(); 
  }
  //   createForm() {
  //   // this.loginForm = this.fb.group({
  //   //   email: ['', Validators.required ],
  //   //   password: ['',Validators.required]
  //   // });

  // }
    ngOnInit() {
              this.loginForm = new FormGroup({
      email:new FormControl('',[
        Validators.required,
        Validators.email,
        ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
        ]),

    });
  }

    tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/user']);
      console.log('Test'+JSON.stringify(res));
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

}
