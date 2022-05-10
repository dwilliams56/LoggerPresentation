import { AuthenticationService } from '../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { PostLogsService } from './../../services/post-logs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent implements OnInit {

  public user: string = '';
  public password: string = '';
  hide = true;

  constructor(private service: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    var User = this.user;
    var password = this.password;

    //testing purposes
    console.log(User);
    console.log(password);

    var token = this.service.userLogin(User, password);
    console.log(token);
    this.goToDash();
  }

  goToDash() {
    this.router.navigate(['../dashboard'])

  }




}
