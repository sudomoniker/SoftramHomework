import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  trigger,
  style,
  transition,
  animate
} from '@angular/animations';

import { Comment } from 'src/app/shared/models/comment.model';
import { WebRequestService } from '../../shared/services/web-request.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [

    trigger('height', [
      transition(':enter', [
        style({height: '1px'}),
        animate('600ms ease-in', style({height: '150px'}))
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({height: '0px'}))
      ])
    ]),

  ]
})
export class CommentsComponent implements OnInit, OnChanges {

  @Input() input!: string;

  comments: Comment;
  reply: string;

  constructor(private webRequest: WebRequestService) { }

  ngOnInit(): void {
    this.reply = '';
    this.getCommentChain(this.input);
  }

  ngOnChanges() {
    this.getCommentChain(this.input);
  }




  //functions
  /**
   * opens the reply box for the id of the passed in comment
   * @param id commentsid
   */
  replyTo(id: string) {
    this.reply = id;
  }

  /**
   * closes the reply box in the comment section
   */
  closeReplyTo() {
    this.reply = '';
  }

  /**
   * gets all comments submitted with a replytoid of the id passed to the function
   * @param id
   */
  getCommentChain(id: string) {
    this.webRequest.get(`commentchain/${id}`).pipe(
      map((res: Comment) => {
        return res
      })
    ).subscribe((comments: Comment) => {
      this.comments = comments
    });
  }

}
