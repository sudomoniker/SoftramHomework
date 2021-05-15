import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  trigger,
  style,
  transition,
  animate
} from '@angular/animations';

import { ConfirmedValidator } from '../shared/validators/confirmed.validator';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [

    trigger('create', [
      transition(':enter', [
        style({transform: 'scale(0)'}),
        animate('400ms ease-in', style({transform: 'scale(1)'}))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({transform: 'scale(0)'}))
      ])
    ]),

    trigger('imagefront', [
      transition(':enter', [
        style({transform: 'scale(0) translateX(-500px)'}),
        animate('650ms ease-in', style({transform: 'scale(1.3) translateX(0px) rotateY(20deg)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({opacity: '0'}))
      ])
    ]),

    trigger('imageshadow', [
      transition(':enter', [
        style({opacity: '0'}),
        animate('650ms ease-in', style({opacity: '0'})),
        animate('400ms ease-in', style({opacity: '1'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({opacity: '0'}))
      ])
    ]),

    trigger('imageback', [
      transition(':enter', [
        style({transform: 'scale(0) translateX(-500px)'}),
        animate('650ms ease-in', style({transform: 'scale(1) translateX(-75pxpx) rotateY(20deg)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({opacity: '0'}))
      ])
    ]),

    trigger('imageback2', [
      transition(':enter', [
        style({transform: 'scale(0) translateX(-500px)'}),
        animate('650ms ease-in', style({transform: 'scale(1.15) translateX(-150pxpx) rotateY(20deg)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({opacity: '0'}))
      ])
    ])
  ]
})
export class NavComponent implements OnInit, OnDestroy{

  //currently logged in user
  user: User;

  //login and create account forms
  loginForm: FormGroup;
  createForm: FormGroup;
  subscription$: Subscription = new Subscription();
  loginUsername: string;
  loginPassword: string;
  createUsername: string;
  createPassword: string;
  createEmail: string;

  //booleans for opening and closing different nav elements
  navOpen = false;
  classApplied = false;
  account = false;
  loggedin = false;
  login = true;
  home = true;
  create: boolean;
  browse: boolean;
  rules: boolean;
  creators: boolean;
  artists: boolean;
  about: boolean;
  error: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
    ) {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
      this.createForm = this.fb.group({
        createUsername: ['', Validators.required],
        createEmail: ['', Validators.required, Validators.email],
        createPassword: ['', Validators.required],
        createPassword2: ['', Validators.required]
      }, {
        validator: ConfirmedValidator('createPassword', 'createPassword2')
      });
  }

  ngOnInit(): void {
    this.subscribtTRFC();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }






  //functions


  /**
  * Handle logging button click.
  */
  onLogButtonClick(): void {
    this.getUser(this.loginUsername, this.loginPassword);
  }

  /**
   * handle create account button click
   */
  onCreateButtonClick(): void {
    this.createUser(this.createUsername, this.createPassword, this.createEmail);
  }

  /**
   * logs the user out and sets the login/create box to the login state for loggin in
   */
  logout() {
    this.user = null;
    this.loggedin = false;
    this.login = true;
  }

  /**
   * subscribe to review changes
   */
  subscribtTRFC(): void  {
    this.subscription$.add(this.loginForm.valueChanges.subscribe((formValues) => {
      this.loginUsername = formValues.username;
      this.loginPassword = formValues.password;
    }));
    this.subscription$.add(this.createForm.valueChanges.subscribe((formValues) => {
      this.createUsername = formValues.createUsername;
      this.createPassword = formValues.createPassword;
      this.createEmail = formValues.createEmail;
    }));
  }

  /**
   * toggles the classes to open the nav menu
   * @param boolean
   */
  toggleClass(boolean?: boolean) {
    this.classApplied = !this.classApplied;
    this.navOpen = !this.navOpen;
    if (boolean) {
      boolean = true;
    }
  }

  /**
   * closes the nav menu
   */
  closeClass() {
    this.classApplied = false;
    this.navOpen = false;
  }




  //web request

  /**
   * logs in a user
   * @param username
   * @param password
   * @returns the user or error data
   */
  getUser(username: string, password: string) {
    return this.authService.login(username, password).pipe(
      map((res: any) => {
        console.log(res);
        return res.user
      })
    ).subscribe((res: User) => {
      this.user = res;
      this.create, this.login = false;
      this.loggedin = true;
    },
    (error: any) => {
      this.error = error;
      this.loginForm.controls['password'].setErrors({'Incorrect': true});
    });
  }

  /**
   * creates a new user account
   * @param username
   * @param password
   * @param email
   * @returns user data or api error data
   */
  createUser(username: string, password: string, email: string) {
    const payload = {
      username,
      password,
      email
    }
    return this.authService.signup(payload).pipe(
      map((res: User[]) => {
        return res[0]
      })
    ).subscribe((res: User) => {
      this.user = res;
    });
  }

}
