import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MyAccessGuard implements CanActivate {
    httpClient: any;
  constructor(
    private router: Router,
    public http: HttpClient
  ) { alert("hello....");console.log("url gard involked...") }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const hasAccess = this.hasAccess(route);

    if (hasAccess) {
      return true;
    }

    this.router.navigate(['/no-access'], {
        skipLocationChange: true, // minimal effect. see https://github.com/angular/angular/issues/17004
        queryParams: {
            url: state.url
        }
    });
    return false;
  }

  hasAccess(route){
      console.log("route");
      console.log(route);
      let alclaims = localStorage.getItem('userClaims');
      console.log(alclaims);
      return true;
  }
}