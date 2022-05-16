import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BASE_TEMPLATE } from './base-template';
import { HighlightService } from './highlight.service';
import { distinctUntilChanged } from 'rxjs';
import { CombatStats } from './combat-stats';
import { TemplateComponent } from './template/template.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'elden-ring-wiki-gen';

  combatForm: FormGroup = this.fb.group({
    name: [''],
    health: [[0]],
    defense: [[]],
    runes: [[]],
    poise: [0],
    absorptions: this.fb.group({
      physical: this.fb.group({
        standard: [0],
        slash: [0],
        strike: [0],
        pierce: [0],
      }),
      magic: this.fb.group({
        magic: [0],
        fire: [0],
        lightning: [0],
        holy: [0],
      }),
    }),
    resistances: this.fb.group({
      poison: [[[100], [], [], [], [], [], [], []]],
      scarletRot: [[[100], [], [], [], [], [], [], []]],
      hemorrhage: [[[100], [], [], [], [], [], [], []]],
      frostbite: [[[100], [], [], [], [], [], [], []]],
      sleep: [[[100], [], [], [], [], [], [], []]],
      madness: [null],
    }),
  });

  @ViewChild(TemplateComponent) template!: TemplateComponent;

  constructor(
    private fb: FormBuilder,
    private highlight: HighlightService,
  ) {
  }
}
