import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginUrl = "https://localhost:5001/api/User/login";
  headers = { headers: new Headers({ 'Content-Type': 'application/json' })};
  private token: any;

  constructor(private http: HttpClient,
              private router: Router,
              ) {}


  setJwtToken(){
    this.token = localStorage.getItem('token');
    return this.token;
  }

  /**  Login Method -- Returns JWT */
  userLogin(user: string, password: string){
    const headers = { 'content-type': 'application/json'}
    var body = JSON.stringify({ UserName: user, Password: password });
    console.log(body);
    return this.http.post(this.loginUrl, body, {'headers': headers}).subscribe((response) =>
    {
      console.log(response);
      localStorage.setItem('token', JSON.stringify(response));
    });
  }

}
