import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { WordDefinition } from '../word-definition.model';

import { environment } from "../../../environments/environment";
const BACKEND_URL = environment.backendURL + "index";

@Injectable()
export class HomeService {

  constructor(private http: HttpClient) {}

  getValues() {
    return this.http.get<{
      wordCount: number, words: WordDefinition[],
      searchWords: {Title: string, wordCount: number, wordId: string, username: string}[],
      userWords: number, userFiles: number
    }>(BACKEND_URL);
  }
}
