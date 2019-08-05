import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../registration/auth.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-homelink',
  templateUrl: './homelink.component.html',
  styleUrls: ['./homelink.component.css']
})
export class HomelinkComponent implements OnInit {

  wordCount: number = 0;
  words = [];
  searches = [];
  username: string = null;
  userWords = 0;
  userFiles = 0;

  constructor(private homeService: HomeService, private authService: AuthService) { }

  ngOnInit() {
    this.username = this.authService.getUserName();
    this.homeService.getValues().subscribe((result) => {
      this.wordCount = result.wordCount;
      this.words = result.words;
      this.searches = result.searchWords;
      this.userWords = result.userWords;
      this.userFiles = result.userFiles;
    });
  }

}
