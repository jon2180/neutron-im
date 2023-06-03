import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

type AuthResult = boolean | UrlTree;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<AuthResult> | Promise<AuthResult> | AuthResult {
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<AuthResult> | Promise<AuthResult> | AuthResult {
    return true;
  }

}
