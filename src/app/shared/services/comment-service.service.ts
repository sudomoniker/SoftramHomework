import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Subject } from "rxjs"
import { map } from 'rxjs/operators';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  comments: Subject<Comment>;
  replies: Subject<Comment>;

  constructor(private webRequest: WebRequestService) {
    this.comments = new Subject();
    this.replies = new Subject();
   }

  /**
   * gets all comments submitted with a replytoid of the id passed to the function
   * @param id
   */
   getCommentChain(id: number) {
    this.webRequest.get(`commentchain/${id}`).pipe(
      map((res: Comment) => {
        return res
      })
    ).subscribe((comments: any) => {
      this.comments.next(comments.filter(c => !c.replycommentid));
      this.replies.next(comments.filter(c => c.replycommentid));
    });
  }

  /**
   *
   * @returns array of top level comments
   */
  returnComments() {
    return this.comments.asObservable();
  }

  /**
   *
   * @returns array of replies to other comments
   */
  returnReplies() {
    return this.replies.asObservable();
  }



  /**
   * creates a comment from the user input
   * @param comment
   */
  createComment(comment: string) {

  }
}
