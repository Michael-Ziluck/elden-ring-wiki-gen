<<<<<<< HEAD
import { AfterViewInit, Component, OnInit } from '@angular/core';
=======
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ViewportScroller } from '@angular/common';
>>>>>>> 25dd6d6 (Display the template as HTML and copy it with formatting intact)
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
export class AppComponent implements AfterViewInit, OnInit {
  title = 'elden-ring-wiki-gen';

  combatForm: FormGroup = this.fb.group({
    name: [''],
    health: [0],
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
      poison: [100],
      scarletRot: [100],
      hemorrhage: [100],
      frostbite: [100],
      sleep: [100],
      madness: [100],
      poisonImmune: [false],
      scarletRotImmune: [false],
      hemorrhageImmune: [false],
      frostbiteImmune: [false],
      sleepImmune: [false],
      madnessImmune: [false],
    }),
  });

  @ViewChild(TemplateComponent) template!: TemplateComponent;

  constructor(
    private fb: FormBuilder,
    private highlight: HighlightService,
  ) {
  }

  ngOnInit(): void {
    Object.entries((this.combatForm.controls['resistances'] as FormGroup).controls).forEach(([key, control]) => {
      if (key.endsWith('Immune')) {
        control.valueChanges.subscribe(value => {
          const input = this.combatForm.get('resistances.' + key.replace('Immune', ''))!;
          if (value) {
            input.disable();
            input.setValue(undefined);
          } else {
            input.enable();
            input.setValue(100);
          }
        });
      }
    });

    this.combatForm.valueChanges.pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
      .subscribe((value: CombatStats) => {
        const immunities = Object.entries(value.resistances)
          .filter(([key, value]) => key.endsWith('Immune') && value === true)
          .map(([key]) => key.replace('Immune', ''));

        if (immunities.length === 0) {
          return;
        }

        immunities.forEach(immunity => {
          const control: AbstractControl | null = this.combatForm.get('resistances.' + immunity);
          // clear the value of anything they're immune to
          control?.disable();
          // disable it too
          control?.setValue(undefined);
        });
      });
  }

  ngAfterViewInit(): void {
  }
}
