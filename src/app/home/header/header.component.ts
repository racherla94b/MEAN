import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../registration/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.username = this.authService.getUserName();
  }

  isLoggedIn () {
    return this.authService.getIsAuth();
  }

  onLogout() {
    this.authService.logout();
  }

  onData() {
    this.router.navigateByUrl('/home/get-data', {skipLocationChange: true}).then( () => this.router.navigate(["/", "home", "add-data"]) );
  }

  onSearch(search: string) {
    console.log(search);
    this.router.navigate(['get-data','search'], {relativeTo: this.route, queryParams: {q: search}});
  }
}
