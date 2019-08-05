import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { WordDefinition } from './word-definition.model';
import { environment } from "../../environments/environment";

const actual_url = environment.backendURL;
const BACKEND_URL = environment.backendURL + "word";

@Injectable()
export class FormDataService {

  constructor(private http: HttpClient, private router: Router) {}

  addWord(wordDef: WordDefinition) {
    this.http.post<{message: string, id: string }>(BACKEND_URL + '/defWord', wordDef)
      .subscribe((responseData) => {
        let id = responseData.id;
        this.router.navigate(["/", "home", "selected", id]);
      });
  }

  getData(word: string, wordsPerPage: number, currentPage: number) {
    console.log(word);
    const queryParams = `?word=${word}&pagesize=${wordsPerPage}&page=${currentPage}`;
    return this.http.get<{message: string, words: WordDefinition[], count: number}>
                                    (BACKEND_URL + '/defWord/' + queryParams );
  }

  getWord(wordId: string) {
    return this.http.get<{message: string, word: WordDefinition}>(BACKEND_URL + '/defWord/' + wordId);
  }

  updateWord(wordDef: WordDefinition, id: string) {
    this.http.put<{message: string, word: WordDefinition}>(BACKEND_URL + '/defWord/' + id, wordDef)
      .subscribe((responseData) => {
        this.router.navigate(["/", "home", "selected", id]);
    });
  }

  deleteWord(id: string) {
    return this.http.delete<{message: string}>(BACKEND_URL + '/defWord/' + id);
  }

  uploadData(filename: string, extfile: string, uploadFile: File) {
    const fileData = new FormData();
    fileData.append("filename", filename);
    fileData.append("fileExt", extfile);
    fileData.append("file", uploadFile, filename);

    this.http.post<{message: string}>(BACKEND_URL + '/addFile', fileData)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.router.navigate(["/", "home", "add-data"]);
    });
  }

  downloadWord(id: string, format: string) {
    console.log("in service");
    return this.http.get(actual_url + 'transform/' + id + '/' + format, {
      responseType: 'blob'
      // headers: new HttpHeaders().append('Content-Type','application/json')
    });
    console.log("out service");
  }
}
