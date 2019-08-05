import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../registration/auth.service';

import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations:[
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1800, keyframes([
          style({
            transform: 'scale3d(1, 1, 1)',
            opacity: 1,
            offset: 0
          }),
          style({
            transform: 'scale3d(1.08, 1.15, 1.08)',
            opacity: 1,
            offset: 0.5
          }),
          style({
            transform: 'scale3d(1, 1, 1)',
            opacity: 1,
            offset: 1
          })
        ]))
      ]),
    ]),
    trigger('bounceup', [
      state('in', style({
      opacity: 1,
      transform: 'translateY(0)'
      })),
      transition('void => *', [
        animate(2800, keyframes([
          style({
             opacity: 0,
             transform: 'translateY(100px)',
             offset: 0
          }),
          style({
             opacity: 1,
             transform: 'translateY(80px)',
             offset: 0.1
          }),
          style({
             opacity: 1,
             transform: 'translateY(60px)',
             offset: 0.2
          }),
          style({
             opacity: 1,
             transform: 'translateY(30px)',
             offset: 0.3
          }),
          style({
             opacity: 1,
             transform: 'translateY(-1px)'
             ,
             offset: 0.4
          }),
          style({
            opacity: 1,
            transform: 'translateY(6px)',
            offset: 0.6
          }),
          style({
            opacity: 1,
            transform: 'translateY(-3px)',
            offset:0.9
          }),
          style({
            opacity: 1,
            transform: 'translateY(0px)',
            offset: 1
          }),
        ]))
      ]),
    ]),
    trigger('zoomin', [         //zoomin animation
      state('in', style({
        opacity: 0,
      })),
      transition('void => *', [
        animate(900, keyframes([
          style({
            transform: 'scale3d(0.3, 0.3, 0.3)',
            opacity: 0,
            offset: 0,
          }),
          style({
            transform: 'scale3d(1, 1, 1)',
            opacity: 1,
            offset: 0.5,
          }),
          style({
            transform: 'scale3d(1, 1, 1)',
            opacity: 1,
            offset: 1,
          }),
        ]))
      ])
    ])
  ]
})
export class LandingPageComponent implements OnInit {
  state = 'normal';
  wildState = 'normal';
  loggedIn: boolean = false;
  userName: string;
  
  constructor(private router: Router, private authService: AuthService) {  }

  ngOnInit() {
    this.loggedIn = this.authService.getIsAuth();
    this.userName = this.authService.getUserName();
  }

  animationStarted(event) {
    console.log(event);
  }

  animationEnded(event) {
    console.log(event);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login', {skipLocationChange: true}).then( () => this.router.navigate(["/"]) );
  }
}
