import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { BehaviorSubject } from "rxjs"
import { map } from 'rxjs/operators';
import { Comment } from '../models/comment.model';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  comments: BehaviorSubject<Comment[]>;
  replies: BehaviorSubject<Comment[]>;
  user: User;

  constructor(
    private webRequest: WebRequestService,
    private auth: AuthService
    ) {
    this.comments = new BehaviorSubject([]);
    this.replies = new BehaviorSubject([]);
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
  async createComment(replytoid: number, comment: string, replycommentid?: number) {
    await this.auth.returnUser().subscribe((user => {
      this.user = user
    }));

    if(this.user == null) {
      return
    }

    let user = this.user.idusers;
    let payload = {
      replytoid,
      user,
      comment,
      replycommentid
    }
    this.webRequest.post(`comments`, payload).subscribe();
  }


}
