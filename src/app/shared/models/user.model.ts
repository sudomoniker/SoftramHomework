export class User {
  constructor(
    public idusers: string,
    public username: string,
    public email: string,
    public instagram?: string,
    public twitter?: string
  ) {
    this.idusers = idusers;
    this.username = username;
    this.email = email;
    this.instagram = instagram;
    this.twitter = twitter;
  }
}
