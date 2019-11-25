import { Injectable } from '@angular/core';
import * as _ from "lodash";
import { SeekaConstants } from '../SeekaConstants';


export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  write: boolean;
  enabled: boolean;
  icon: string;
  showActiveDeactive:boolean;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

export interface UserClaim {
  id: number;
  adminRoleId: number;
  adminRoleName: string;
  userId: number; 
  name: string;
  write: boolean;
}

const MENUITEMS = SeekaConstants.MENUITEMS

@Injectable()
export class MenuItems {
  getAll(): any[] {
    let userRoleDTO = [];
    let arrayDTO = [];
    let allMenuListWithPremission = [];
    let userShowClaims = JSON.parse(localStorage.getItem("userClaims"));    
    return MENUITEMS;
  }

  getSpecificModulePermission(module): any {  
    
    let userShowClaims = JSON.parse(localStorage.getItem("userClaims"));
    
    let claims = _.filter(userShowClaims , (val, key)=>{   
    
      if(val.name == module) {
        claims = val;
        return val;
      }
      else{
        claims = null;
        return null;
      }
    });    
    return claims;

  }
}


