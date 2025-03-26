import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IUser } from './model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
  private _url: string = "http://localhost:3000/users";
  constructor(private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('user'))
    this.user.next(user)
  }


  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this._url);
  }
  
  setUser(user: IUser) {
    localStorage.setItem('user', JSON.stringify(user))
    this.user.next(user)


  }

}