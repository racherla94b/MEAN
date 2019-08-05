import { Component, Inject } from '@angular/core';
import { MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-download-dialog',
  templateUrl: './download-dialog.component.html',
  styleUrls: ['./download-dialog.component.css']
})
export class DownloadDialogComponent {

  formats: string[] = ['json', 'xml', 'txt', 'csv'];

  constructor(public dialogRef: MatDialogRef<DownloadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  onNoClicK() {
    this.dialogRef.close();
  }
}
