import { NgModule } from "@angular/core";
import { MatInputModule, MatCardModule, MatSelectModule, MatExpansionModule, MatPaginatorModule,
    MatListModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule, MatRadioModule }
  from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatRadioModule
  ]
})
export class AngularMaterialMoule {}
