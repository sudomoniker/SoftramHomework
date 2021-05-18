import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {
  trigger,
  style,
  transition,
  animate
} from '@angular/animations';

import { Comment } from 'src/app/shared/models/comment.model';
import { CommentServiceService } from 'src/app/shared/services/comment-service.service';

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
export class CommentsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() artpostid!: number;
  @Input() input!: number;
  reply: number;
  comments: Comment[];
  subscription = new Subscription();

  constructor(
    private commentService: CommentServiceService
    ) { }

  ngOnInit(): void {
    this.reply = null;

    if(!this.input) {
      this.subscription.add(
        this.commentService.returnComments().subscribe((comments => {
          this.comments = comments;
        }))
      );
    }

    if(this.input) {
      this.subscription.add(
        this.commentService.returnReplies().subscribe((comments => {
          this.comments = comments.filter((c => c.replycommentid == this.input));
        }))
      );
    }


  }

  ngOnChanges() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  //functions
  /**
   * opens the reply box for the id of the passed in comment
   * @param id commentsid
   */
  replyTo(id: number) {
    this.reply = id;
  }

  /**
   * closes the reply box in the comment section
   */
  closeReplyTo() {
    this.reply = null;
  }

  createComment(comment: string, replycommentid?: number) {
    this.commentService.createComment(this.artpostid, comment, replycommentid)
  }

}
