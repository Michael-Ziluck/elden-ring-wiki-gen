import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateComponent } from './template/template.component';
import { ReplacePipe } from './replace-pipe';
import { ResistanceInputComponent } from './resistance-input/resistance-input.component';
import { NewGameRowInputComponent } from './new-game-row-input/new-game-row-input.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ReplacePipe,
    ResistanceInputComponent,
    NewGameRowInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
