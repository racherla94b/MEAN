import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormDataService } from '../form-data.service';
import { WordDefinition } from '../word-definition.model';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  mode: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe((result) => {
      if(this.route.children.length) {
        let compName: any = this.route.children[0].component;
        if(compName.name === "AddFormComponent") {
          this.mode = 'form';
        } else {
          this.mode = 'upload';
        }
      } else {
        this.mode = '';
      }
    });
  }

  selectMode(mode: string) {
    this.mode = mode;
    this.router.navigate(["/", "home", "add-data", mode]);
  }
}
