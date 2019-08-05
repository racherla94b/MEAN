import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { mimeType } from './mime-type.validator';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean = false;
  fileSelected: boolean = false;
  filename: string;
  fileExt: string;

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {
    this.form = new FormGroup({
      uploadFile: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }

  onFilePicked(event: Event) {
    this.fileSelected = true;
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.form.patchValue({uploadFile: file});
    this.form.get('uploadFile').updateValueAndValidity();
    this.filename = file.name;
    this.fileExt = file.type;
  }

  onUpload() {
    this.isLoading = true;
    this.formDataService.uploadData(this.filename, this.fileExt, this.form.value.uploadFile);
  }
}
