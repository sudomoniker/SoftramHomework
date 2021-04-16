import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) {
    this.ROOT_URL = 'https://linkeddesign.online:3000';
   }

   get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  postImg(uri: string, title: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("image", image);
    return this.http.post(`${this.ROOT_URL}/${uri}`, postData);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  login(username:string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users/login`, {
      username,
      password
    },{
      observe: 'response'
    });
  }

  signup(username: string, email:string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users`, {
      username,
      email,
      password
    },{
      observe: 'response'
    });
  }


}
