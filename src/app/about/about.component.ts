import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  videoSrc: string;

  constructor() { }

  ngOnInit(): void {
    this.videoSrc = "https://www.youtube.com/embed/hGR06bX5d_Q";
  }


  video1() {
    this.videoSrc = "https://www.youtube.com/embed/hGR06bX5d_Q";
  }

  video2() {
    this.videoSrc = "https://www.youtube.com/embed/M_cnYbSUkCI";
  }
}
