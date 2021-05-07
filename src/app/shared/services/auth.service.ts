import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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



    login(username: string, password: string) {
      return this.webService.get(`users/${username}/${password}`)
    }


    signup(payload: Object) {
      return this.webService.post('users', payload);
    }

    logout() {
      this.removeSession();
    }

    getAccessToken() {
      return localStorage.getItem('x-access-item');
    }

    getRefreshToken() {
      return localStorage.getItem('x-refresh-item');
    }

    setAccessToken(accessToken: string) {
      localStorage.setItem('x-access-token', accessToken);
    }

    private setSession(userId: string, accessToken: string, refreshToken: string) {
      localStorage.setItem('user-id', userId);
      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('refresh-token', refreshToken);
    }

    private removeSession() {
      localStorage.removeItem('user-id');
      localStorage.removeItem('access-token');
      localStorage.removeItem('refresh-token');
    }


}

