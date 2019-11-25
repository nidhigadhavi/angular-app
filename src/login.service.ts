import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(loginCredential) {
    let authKey: string = this.getBasicAuth("USER_CLIENT_APP", "password");
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', authKey)
      .set('No-Auth', 'True');
    let body = new HttpParams();
    body = body.set('username', loginCredential.username);
    body = body.set('password', loginCredential.password);
    body = body.set('grant_type', 'password');
    console.log(body);

    // return this.http.post('/oauth/token', body, { headers: headers });
    return new Promise((resolve, reject) => {
      debugger;
      // this.http.post('http://3.0.184.57:8903/identity/oauth/token', body, { headers: headers }).toPromise().then(res => {
      this.http.post('http://18.140.52.200:8900/identity/oauth/token', body, { headers: headers }).toPromise().then(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    });
  }

  getBasicAuth(clientId: string, secretId: string) {
    let credential: string = clientId + ":" + secretId;
    console.log(btoa(credential));
    return "Basic " + btoa(credential);
  }

  logout() {
    let sessionId = JSON.parse(localStorage.getItem('LoginResponceToken')).userSessionId;
    const headers = new HttpHeaders()
      // .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('userSessionId', sessionId)
      .set('userId', localStorage.getItem('userId'));
    return new Promise((resolve, reject) => {
      this.http.delete('http://18.140.52.200:8900/identity/oauth/token/', { headers: headers }).toPromise().then(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    });
  }
}
