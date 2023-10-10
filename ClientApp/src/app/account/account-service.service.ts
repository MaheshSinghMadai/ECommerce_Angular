import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,  map } from 'rxjs';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  baseUrl = 'https://localhost:7049/api/';
  public currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http : HttpClient, private router: Router) {
    if(localStorage.getItem('token') != null 
      || localStorage.getItem('name') != null 
      || localStorage.getItem('email') != null)
    {
      const token = localStorage.getItem('token').toString();
      const name = localStorage.getItem('name').toString();
      const email = localStorage.getItem('email').toString();
      const user = {
        email: email,
        displayName: name,
        token: token
      }
      
      this.currentUserSource = new BehaviorSubject<User>(user);
      console.log(this.currentUserSource);

      this.currentUser$ = this.currentUserSource.asObservable();
      console.log(this.currentUser$);
  }
}

  getCurrentUserValue(){
    console.log(this.currentUser$);
    console.log(this.currentUserSource);

    return this.currentUserSource.value;
  }

  login(values: any){
    return this.http.post(this.baseUrl + 'Account/Login' ,values).pipe(
      map((user:User) =>{
        if(user){
          localStorage.setItem('name', user.displayName);
          localStorage.setItem('email', user.email);
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(values: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', values).pipe(
      map(user => {
        localStorage.setItem('name', user.displayName);
        localStorage.setItem('email', user.email);
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  //for jwt-interceptor
  getToken(){
  return localStorage.getItem('token');
  }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(this.baseUrl + 'account/emailExists?email=' + email);
  }
}

