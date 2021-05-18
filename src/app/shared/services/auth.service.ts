import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from "rxjs"

import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  user?: BehaviorSubject<User>;

  constructor(
    private webService: WebRequestService
    ) {
      this.user = new BehaviorSubject<User>(null);
      }



    //functions
    /**
     * logs a user in
     * @param username
     * @param password
     * @returns api response data
     * fairly certain this is a bad way to log a user in, putting the password in the get request, will implement a proper post request later
     */
    login(username: string, password: string) {
      return this.webService.get(`users/${username}/${password}`).pipe(
        tap(((user: User) => {
          console.log(user);
          this.user.next(user);
        }))
      )
    }

    /**
     * signs a user up to the site
     * @param payload (user data, username, password, email)
     * @returns api response data
     */
    signup(payload: Object) {
      return this.webService.post('users', payload);
    }

    /**
     *
     * @returns the loggedin user
     */
    returnUser() {
      return this.user.asObservable();
    }

}

