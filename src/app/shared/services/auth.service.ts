import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  user?: User;

  constructor(
    private webService: WebRequestService
    ) {    }



    //functions
    /**
     * logs a user in
     * @param username
     * @param password
     * @returns api response data
     * fairly certain this is a bad way to log a user in, putting the password in the get request, will implement a proper post request later
     */
    login(username: string, password: string) {
      return this.webService.get(`users/${username}/${password}`)
    }

    /**
     * signs a user up to the site
     * @param payload (user data, username, password, email)
     * @returns api response data
     */
    signup(payload: Object) {
      return this.webService.post('users', payload);
    }


}

