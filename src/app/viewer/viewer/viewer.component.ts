import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  trigger,
  style,
  transition,
  animate
} from '@angular/animations';
import { WebRequestService } from 'src/app/shared/services/web-request.service';
import { Artpost } from '../../shared/models/artpost.model';
import { Creator } from '../../shared/models/creator.model';
import { SortByPipe } from 'src/app/shared/pipes/sort-by.pipe';
@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  animations: [

    trigger('singleview', [
      transition(':enter', [
        style({transform: 'translateX(-100vw)'}),
        animate('1200ms ease-in', style({transform: 'translateX(0vw)'}))
      ]),
      transition(':leave', [
        animate('1200ms ease-in', style({transform: 'translateX(100vw)'}))
      ])
    ]),
    trigger('gridview', [
      transition(':enter', [
        style({transform: 'translateX(-100vw)'}),
        animate('1200ms ease-in', style({transform: 'translateX(0vw)'}))
      ]),
      transition(':leave', [
        animate('1200ms ease-in', style({transform: 'translateX(100vw)'}))
      ])
    ]),

    trigger('line', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('600ms ease-in', style({transform: 'translateX(0)'}))
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ]),

    trigger('line2', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('600ms ease-in', style({transform: 'translateX(0)'}))
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ]),

    trigger('line3', [
      transition(':enter', [
        style({transform: 'translateY(100%)'}),
        animate('600ms ease-in', style({transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ]),

    trigger('line4', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('600ms ease-in', style({transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({transform: 'translateY(100%)'}))
      ])
    ]),


  ]
})
export class ViewerComponent implements OnInit {

  gridview: boolean;
  currentPost: number;
  artpost: Artpost;
  artposts: Artpost[] = [];
  commentid: string;
  creators: Creator[] =[];
  imageloader: string;

  constructor(
    private webRequest: WebRequestService
  ) { }

  ngOnInit(): void {
    this.gridview = false;
    this.getCreators();
    this.getArtPosts('bla');
  }

  getArtPosts(range: string) {
    return this.webRequest.get(`artpost`).pipe(
      map((res: any) => {
        return res
      })
    ).subscribe((res: any) => {
      this.artposts = res;
      this.currentPost = 0;
      this.getArtPost(this.currentPost);
      this.preloadImage();
    });
  }

  getArtPost(id: number) {
    this.artpost = this.artposts[id];
    this.commentid = this.artpost.idartpost + this.artpost.title;
  }

  getCreators() {
    return this.webRequest.get(`creators`).pipe(
      map((res: any) => {
        return res
      })
    ).subscribe((res: any) => {
      this.creators = res;
    });
  }

  getNextPost() {
    this.currentPost ++;
    if (this.currentPost == 9) {
      this.currentPost = 0;
    }
    this.getArtPost(this.currentPost);
  }

  getPrevPost() {
    this.currentPost --;
    if (this.currentPost == -1) {
      this.currentPost = 8;
    }
    this.getArtPost(this.currentPost);
  }

  goToPost(artpost: Artpost) {
    this.artpost = artpost;
    this.commentid = this.artpost.idartpost + this.artpost.title;
    this.gridview = false;
  }

  createComment(comment: string) {

  }


  preloadImage() {
    for(let x of this.artposts) {
      let img = new Image();
      img.src = x.imgsrc ;
    }
  }

}
