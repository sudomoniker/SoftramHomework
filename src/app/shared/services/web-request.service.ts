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
    this.ROOT_URL = 'http://localhost:3000';
   }




  //functions

 /**
  * gets data from api
  * @param uri pass in what api route you want to get
  * @returns api response data
  */
  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  /**
   * post data to api
   * @param uri pass in what api route you want to get
   * @param payload an object of whatever you are trying to post
   * @returns api response data
   */
  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  /**
   * edit already made entries in the database
   * @param uri pass in what api route you want to get
   * @param payload an object of whatever you are trying to post
   * @returns api response data
   */
  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  /**
   * delete an existing entry from the database
   * @param uri pass in what api route you want to get
   * @returns api response data
   */
  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }


}
