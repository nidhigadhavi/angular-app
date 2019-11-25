import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') == "True") {
      const clonedreq = req.clone({
        headers: req.headers.delete('No-Auth', 'True')
      });
      return next.handle(clonedreq.clone());
    }

    if (localStorage.getItem('userToken') != null) {
      const clonedreq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))
      });
      return next.handle(clonedreq).pipe(
        tap(succ => { }, err => {
          console.log(JSON.stringify(err));
          if (err.status === 401 || err.status === 0) {
            localStorage.clear();
            this.router.navigate(['/']);
          }
        })
      );

    } else if (localStorage.getItem('userToken') == null) {
      this.router.navigate(['/']);
    }
  }
}
