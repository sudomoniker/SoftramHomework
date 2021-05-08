export class Artpost {
  constructor(
    public idartposts: number, //is idartposts with an s because the table in the database is artposts, and the id is idartposts, just keeping it consistent
    public imgsrc: string,
    public user: number,
    public title: string,
    public creatorid: number,
    public instagram?: string,
    public twitter?: string,
  ) {
    this.idartposts = idartposts;
    this.imgsrc = imgsrc;
    this.user = user;
    this.title = title;
    this.creatorid = creatorid;
    this.instagram = instagram;
    this.twitter = twitter;
  }
}
