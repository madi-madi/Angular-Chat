import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(
	 private authService : AuthService,
	 private router : Router
		){

	}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  	return this.authService.isSignedInStream
  	.pipe(map<boolean , boolean>((isSignedIn:boolean)=>{
  		if (!isSignedIn) {
  			// code...
  			this.router.navigate(['/login']);
  		}

  		return isSignedIn;

  	}))
    // return true;
  }
}
