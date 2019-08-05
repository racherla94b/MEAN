import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PageEvent, MatDialog, MatDialogRef } from '@angular/material';
import { saveAs } from 'file-saver';

import { DownloadDialogComponent } from '../download-dialog/download-dialog.component';
import { WordDefinition } from '../../word-definition.model';
import { FormDataService } from '../../form-data.service';
import { AuthService } from '../../../registration/auth.service';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit {

  isLoading: boolean = false;
  corestandards = ['Title', 'Creator', 'Subject', 'Description', 'Publisher', 'Contributor', 'Daydate', 'Type', 'Format' , 'Identifier','Source', 'Language', 'Relation' , 'Coverage' , 'Rights'];
  searchData: any[] = [];
  wordId: string;
  single: boolean = false;
  mode: string = 'multiple';
  totalWords = 60;
  wordsPerPage = 1;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  searchWord: string;
  loggedUserId: string;
  dataFormat: string;
  anyDisplay: boolean = false;

  constructor(private formDataService: FormDataService, private authService: AuthService,
        private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("wordId")) {
        this.mode = 'single';
        this.wordId = paramMap.get("wordId");
        this.formDataService.getWord(this.wordId)
          .subscribe((responseData) => {
            this.loggedUserId = this.authService.getUserId();
            this.single = true;
            this.searchData[0] = responseData.word;
        });
      } else {
        this.mode = 'multiple';
        this.route.queryParams.subscribe(
          data => {
            this.loggedUserId = this.authService.getUserId();
            this.searchWord = data.q;
            this.onBackend(this.currentPage, this.wordsPerPage);
          },
          error => console.log(error)
        );
      }
    });
  }

  onBackend(currentPage: number, wordsPerPage: number) {
    if(this.searchWord) {
      this.formDataService.getData(this.searchWord, wordsPerPage, currentPage)
        .subscribe((receivedData) => {
          this.isLoading = false;
          if(receivedData.count === 0) {
            this.anyDisplay = true;
          } else {
            this.searchData = receivedData.words;
            this.totalWords = receivedData.count;
          }
      }, (err) => {
        console.log(err);
        this.totalWords = err.count;
      });
    } else {
      setTimeout(() => {
        this.router.navigate(['/', 'home']);
      }, 2000);
    }
  }

  onEdit(wordId: string) {
    console.log("Edit");
    this.router.navigate(['/', 'home', 'edit', wordId]);
  }

  onDelete(wordId: string) {
    console.log("Delete");
    this.formDataService.deleteWord(wordId)
      .subscribe(() => {
        this.onBackend(this.currentPage, this.wordsPerPage);
    });
  }

  openDialog(wordId: string, title: string) {
    const dialogRef = this.dialog.open(DownloadDialogComponent, {
      width: '400px',
      data: {dataFormat: this.dataFormat}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataFormat = result;
      this.onDownload(wordId, title, result);
    });
  }

  onDownload(wordId: string, title: string, format: string) {
    console.log(format);
    if(format) {
      this.formDataService.downloadWord(wordId, format)
        .subscribe((data) => {
          let filename: string = title + ' - ' + wordId + '.' + format;
          saveAs(data, filename);
        }, (err) => {
          console.log(err);
      });
    }
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.wordsPerPage = pageData.pageSize;
    this.onBackend(this.currentPage, this.wordsPerPage);
  }
}
