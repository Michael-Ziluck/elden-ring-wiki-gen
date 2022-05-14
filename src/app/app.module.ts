import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateComponent } from './template/template.component';
import { ReplacePipe } from './replace-pipe';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ReplacePipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
