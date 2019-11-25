import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Alert, AlertType } from './models/Alert';


@Injectable({
  providedIn: 'root'
})

export class AlertService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;
  public popup: Subject<any> = new Subject<any>();
  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  showMessage(message: string, status: number, keepAfterRouteChange = false) {
    console.log("intot service of .... show service");    
    if (status == 200) {
      this.alert(AlertType.Success, message, keepAfterRouteChange);
    } else {
      this.alert(AlertType.Error, message, keepAfterRouteChange);
    }
  }

  alert(type: AlertType, message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Alert>{ type: type, message: message });
  }

  clear() {
    // clear alerts
    this.subject.next();
  }


}
