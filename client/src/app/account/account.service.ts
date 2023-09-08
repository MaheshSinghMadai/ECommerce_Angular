import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  baseUrl = environment.apiUrl;

  private currentUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  getCurrentUserValue(){
    return this.currentUserSource.value;
  }
  
  loadCurrentUser(token: string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer${token}`);

    return this.http.get<IUser>(this.baseUrl + 'account' , {headers}).pipe(
      map(user => {
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        } 
      }
    ))
  }

  login(values : any){
    return this.http.post(this.baseUrl + 'account/login' , values).pipe(
      map((user : IUser) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
        return user;
      })
    )
  }

  register(values : any){
    return this.http.post(this.baseUrl + 'account/register' , values).pipe(
      map((user:IUser) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
        
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string){
    return this.http.get(this.baseUrl + 'áccount/emailexist?email=' + email);
  }

}
