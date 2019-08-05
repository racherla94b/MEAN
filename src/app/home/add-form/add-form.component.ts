import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { FormDataService } from '../form-data.service';
import { WordDefinition } from '../word-definition.model';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

    @ViewChild('f') metadataForm: NgForm;
    nos = [1,3,5,7,9,11,13];
    private mode: string = 'create';
    private wordId: string;
    isLoading: boolean = false;
    corestandards = ['Title', 'Creator', 'Subject', 'Description', 'Publisher', 'Contributor', 'Daydate', 'Type', 'Format' , 'Identifier','Source', 'Language', 'Relation' , 'Coverage' , 'Rights'];
    item: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

    emptyForm: WordDefinition = {
      title: '',
      creator: '',
      subject: '',
      description: '',
      publisher: '',
      contributor: '',
      daydate: '',
      type: '',
      format: '',
      identifier: '',
      source: '',
      language: '',
      relation: '',
      coverage: '',
      rights: '',
    };

    formData: WordDefinition = this.emptyForm;

    constructor(private formDataService: FormDataService, private route: ActivatedRoute) { }

    ngOnInit() {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if(paramMap.has("wordId")) {
          this.mode = 'edit';
          this.wordId = paramMap.get("wordId");
          this.isLoading = true;

          this.formDataService.getWord(this.wordId)
            .subscribe((responseData) => {
              this.formData = responseData.word;
              this.whenEdit();
              this.isLoading = false;
          });
        } else {
          this.mode = 'create';
          this.wordId = null;
        }
      });
    }

    addInput(i: number) {
      this.item[i] = true;
    }

    removeInput(i: number) {
      this.item[i] = false;
    }

    whenEdit() {
        for(let i = 0; i < this.corestandards.length; i++) {
          let stdrd = this.corestandards[i]
          if(this.formData[stdrd]) {
            this.item[i] = true;
          }
        }
      }

    onSubmit() {
      if(this.metadataForm.invalid) {
        return;
      }
      if(this.mode === "create") {
        console.log(this.metadataForm.value);
        this.formDataService.addWord(this.metadataForm.value);
      } else {
        this.formDataService.updateWord(this.metadataForm.value, this.wordId);
      }
      this.item = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
      this.metadataForm.reset();
    }
  }
