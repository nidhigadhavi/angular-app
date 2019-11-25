import { Injectable } from '@angular/core';
import { Router, CanActivate , ActivatedRouteSnapshot } from '@angular/router';
import * as _ from 'lodash';
// import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {      
    const token = localStorage.getItem('userToken');
    const userClaims = localStorage.getItem('userClaims');
    // console.log(route);
    let currentModule = route.routeConfig.path;
    let permission = _.filter(JSON.parse(userClaims), function(val,index) { 
        // console.log("permission::");  
        // console.log(currentModule.toUpperCase());
        // console.log(val['name'].toUpperCase()); 
        
        if(currentModule == 'User-Setting' || currentModule == 'All-Users'){
          if(val['name'].toUpperCase() == 'USERS'){
            return true;
          }
          else{
            return false;
          }
        }
        else if(val['name'].toUpperCase() ==  currentModule.toUpperCase()){
          return true;
        }
        else {
          return false;
        }
    });    
    if (token == null) {
      this.router.navigate(['/']);
      return false;
    }
    else if(permission.length == 0 ){
        this.router.navigate(['/notFound']);
      return false;   
    }
    else{
        return true;
    }
  }
}