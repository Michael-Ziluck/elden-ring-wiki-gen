import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateComponent } from './template/template.component';
import { ResistanceInputComponent } from './resistance-input/resistance-input.component';
import { NewGameRowInputComponent } from './new-game-row-input/new-game-row-input.component';
import { DecamelPipe } from './decamel.pipe';
import { SpaceToPlusPipe } from './space-to-plus.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ResistanceInputComponent,
    NewGameRowInputComponent,
    DecamelPipe,
    SpaceToPlusPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatAutocompleteModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
