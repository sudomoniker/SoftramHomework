export class Comment {
  constructor(
    public idcomments: number, //is idcomments with an s because the table in the database is comments, and the id is idcomments, just keeping it consistent
    public replytoid: string,
    public user: number,
    public comment: string,
    public username?: string
  ) {
    this.idcomments = idcomments;
    this.replytoid = replytoid;
    this.user = user;
    this.comment = comment;
    this.username = username;
  }
}
