import { Injectable } from '@angular/core';
import {User} from "../../shared/models/user.model";
import {BehaviorSubject, Subject} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NavbarService} from "../../shared/services/navbar.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user : User = new User();
  private token?  : string | null;
  private authUrl : string = environment.API_URL + '/authenticate';
  private currentRoute : string = "";
  errorEmitter : Subject<string> = new Subject<string>();
  userChange : BehaviorSubject<User> = new BehaviorSubject<User>(this.user);

  constructor(private httpClient:HttpClient, private router:Router, private navbarService:NavbarService) {
    this.navbarService.getCurrentRoute().subscribe(res => this.currentRoute = res);
  }

  login(credentials : {email:string, password:string}) {

    this.httpClient.post<{status:string, user:User, token:string}>(this.authUrl, credentials).subscribe((res : {status:string, user:User, token:string}) => {

      if (res.status == 'OK') {

        this.user = res.user;
        this.token = res.token;
        sessionStorage.setItem('token', this.token);
        this.userChange.next({...this.user});
        this.errorEmitter.next('');
        this.router.navigate(['profile']);

      } else {

        this.errorEmitter.next(res.status);
        console.log(res.status);

      }

    })
  }

  logout() {

    this.user = new User();
    this.token = null;
    sessionStorage.removeItem('token');
    this.userChange.next(this.user);

    if (this.currentRoute === '/profile') {
      this.router.navigate(['login']);
    }

  }

  getUser() : User {
    return {...this.user}
  }

  getToken() {

    if (this.token) return this.token;
    else {
      this.token = sessionStorage.getItem('token');
      return this.token;
    }

  }

  isAuthenticated() {
    return this.user.id != 0;
  }

  isAdmin() {
    return this.user.admin;
  }

  whoAmI() {

    if (this.getToken()) {
      this.httpClient.get<{status:string, user?:User}>(environment.API_URL + '/api/me').subscribe((res : {status:string, user?:User}) => {

        if (res.status == 'OK') {

          if (res.user) {

            this.user = res.user;
            this.userChange.next({...this.user});

          }

        } else {
          console.log(res.status);
          this.router.navigate(['']);
        }

      })
    }
  }
}
