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

  artpost: Artpost;
  artposts: Artpost[] = [];
  creators: Creator[] =[];
  gridview: boolean;
  currentPost: number;
  commentid: string;
  imageloader: string;

  constructor(
    private webRequest: WebRequestService
  ) { }

  ngOnInit(): void {
    this.gridview = false;
    this.getCreators();
    this.getArtPosts('bla');
  }






  //functions


  /**
   *  calls the api to retrieve a certain range of artposts
   * @param range -this isnt currently being used, will be passed a range of posts to retrieve in the future
   * @returns an array of artposts
   */
  getArtPosts(range: string) {
    return this.webRequest.get(`artposts`).pipe(
      map((res: Artpost[]) => {
        return res
      })
    ).subscribe((res: Artpost[]) => {
      this.artposts = res;
      this.currentPost = 0;
      this.getArtPost(this.currentPost);
      this.preloadImage();
    });
  }


  /**
   * sets the current artpost to the id of the one passed to the function
   * @param id
   */
  getArtPost(id: number) {
    this.artpost = this.artposts[id];
    this.commentid = this.artpost.idartposts + this.artpost.title;
  }

  /**
   * calls the api to retrieve the full list of creators in the database so that users can click on that creator and look at artwork submitted for that creator
   * @returns list of creators
   */
  getCreators() {
    return this.webRequest.get(`creators`).pipe(
      map((res: Creator[]) => {
        return res
      })
    ).subscribe((res: Creator[]) => {
      this.creators = res;
    });
  }

  /**
   * when clicked, sets the artpost to the next artpost in the retrieved array
   */
  getNextPost() {
    this.currentPost ++;
    if (this.currentPost == 9) {
      this.currentPost = 0;
    }
    this.getArtPost(this.currentPost);
  }

  /**
   * when clicked, sets the artpost to the previous artpost in the retrieved array
   */
  getPrevPost() {
    this.currentPost --;
    if (this.currentPost == -1) {
      this.currentPost = 8;
    }
    this.getArtPost(this.currentPost);
  }

  /**
   * when in gridview, switches to single view of the artwork clicked on while in gridview
   * @param artpost
   */
  goToPost(artpost: Artpost) {
    this.artpost = artpost;
    this.commentid = this.artpost.idartposts + this.artpost.title;
    this.gridview = false;
  }

  /**
   * creates a comment from the user input
   * @param comment
   */
  createComment(comment: string) {

  }

  /**
   * preloads the images in gridview, so the animation when switching between gridview and singleview is smooth
   */
  preloadImage() {
    for(let x of this.artposts) {
      let img = new Image();
      img.src = x.imgsrc ;
    }
  }

}
