import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  trigger,
  style,
  transition,
  animate
} from '@angular/animations';

import { Comments } from 'src/app/shared/models/comments.model';
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

  comments: Comments;
  reply: string;

  constructor(private webRequest: WebRequestService) { }

  ngOnInit(): void {
    this.reply = '';
    this.getCommentChain(this.input);
  }

  ngOnChanges() {
    this.getCommentChain(this.input);
  }


  replyTo(id: string) {
    this.reply = id;
  }
  closeReplyTo() {
    this.reply = '';
  }


  /**
   * get commetns
   */
   getCommentChain(id: string) {
    this.webRequest.get(`commentchain/${id}`).pipe(
      map((res: any) => {
        return res
      })
    ).subscribe((comments: Comments) => {
      this.comments = comments
    });
  }

}
