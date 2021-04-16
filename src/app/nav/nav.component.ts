import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  trigger,
  style,
  transition,
  animate
} from '@angular/animations';

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

  reviewForm: FormGroup;
  subscription$: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder
    ) {
      this.reviewForm = this.fb.group({
        title: ['', Validators.required],
        rating: ['', Validators.required],
        comments: ['', Validators.required]
      });
     }

     ngOnInit(): void {
      this.subscribtTRFC();
      this.login = true;
    }

    ngOnDestroy(): void {
      this.subscription$.unsubscribe();
    }


    /**
     * Handle logging button click.
     *
     */
    onLogButtonClick(): void {
      console.log(this.reviewForm.value);
    }


    /**
     * subscribe to review changes
     */
    subscribtTRFC(): void  {
      this.subscription$.add(this.reviewForm.valueChanges.subscribe((formValues) => {
        console.log(formValues);
      }));
    }

  navOpen = false;
  classApplied = false;
  account = false;
  login: boolean;
  create: boolean;
  home: boolean;
  browse: boolean;
  rules: boolean;
  creators: boolean;
  artists: boolean;
  about: boolean;

  toggleClass() {
    this.classApplied = !this.classApplied;
    this.navOpen = !this.navOpen;
  }

}
