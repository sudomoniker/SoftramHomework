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
import { WebRequestService } from '../shared/services/web-request.service';
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

  user: User;

  loginForm: FormGroup;
  createForm: FormGroup;
  subscription$: Subscription = new Subscription();

  loginUsername: string;
  loginPassword: string;
  createUsername: string;
  createPassword: string;
  createEmail: string;

  constructor(
    private fb: FormBuilder,
    private webRequest: WebRequestService,
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
      this.login = true;
      this.home = true;
    }

    ngOnDestroy(): void {
      this.subscription$.unsubscribe();
    }


    /**
     * Handle logging button click.
     *
     */
    onLogButtonClick(): void {
      this.getUser(this.loginUsername, this.loginPassword);
    }

    onCreateButtonClick(): void {
      this.createUser(this.createUsername, this.createPassword, this.createEmail);
    }

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

  navOpen = false;
  classApplied = false;
  account = false;
  loggedin = false;
  login: boolean;
  create: boolean;
  home: boolean;
  browse: boolean;
  rules: boolean;
  creators: boolean;
  artists: boolean;
  about: boolean;
  error: any;

  toggleClass(boolean?: boolean) {
    this.classApplied = !this.classApplied;
    this.navOpen = !this.navOpen;
    if (boolean) {
      boolean = true;
    }
  }

  closeClass() {
    this.classApplied = false;
    this.navOpen = false;
  }


  //web request
  //login
  getUser(username: string, password: string) {
    return this.authService.login(username, password).pipe(
      map((res: any) => {
        return res.user
      })
    ).subscribe((res: any) => {
      this.user = res;
      this.create, this.login = false;
      this.loggedin = true;
    },
    (error: any) => {
      this.error = error;
      this.loginForm.controls['password'].setErrors({'Incorrect': true});
    });
  }

  //create a new user
  createUser(username: string, password: string, email: string) {
    const payload = {
      username,
      password,
      email
    }
    return this.authService.signup(payload).pipe(
      map((res: any) => {
        return res[0]
      })
    ).subscribe((res: any) => {
      this.user = res;
    });
  }






}
