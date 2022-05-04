import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BASE_TEMPLATE } from './base-template';
import { HighlightService } from './highlight.service';
import { distinctUntilChanged } from 'rxjs';

interface CombatStats {
  name: string;
  health: number;
  poise: number;
  absorptions: {
    physical: {
      standard: number,
      slash: number,
      strike: number,
      pierce: number,
    },
    magic: {
      magic: number,
      fire: number,
      lightning: number,
      holy: number,
    },
  };
  resistances: {
    poison: number,
    scarletRot: number,
    hemorrhage: number,
    frostbite: number,
    sleep: number,
    madness: number,
    deathBlight: number,
    poisonImmune: boolean,
    scarletRotImmune: boolean,
    hemorrhageImmune: boolean,
    frostbiteImmune: boolean,
    sleepImmune: boolean,
    madnessImmune: boolean,
    deathBlightImmune: boolean,
  };
}

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
      deathBlight: [100],
      poisonImmune: [false],
      scarletRotImmune: [false],
      hemorrhageImmune: [false],
      frostbiteImmune: [false],
      sleepImmune: [false],
      madnessImmune: [false],
      deathBlightImmune: [false],
    }),
  });

  display: string = '';

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

  renderTemplate(): void {
    this.display = BASE_TEMPLATE;
    const { name, health, poise, resistances, absorptions }: CombatStats = this.combatForm.value;

    this.display = this.display.replace('{{name}}', name);
    this.display = this.display.replace('{{health}}', health?.toString());
    this.display = this.display.replace('{{poise}}', poise?.toString());
    this.display = this.display.replace('{{physical.standard}}', absorptions.physical.standard?.toString());
    this.display = this.display.replace('{{physical.slash}}', absorptions.physical.slash?.toString());
    this.display = this.display.replace('{{physical.strike}}', absorptions.physical.strike?.toString());
    this.display = this.display.replace('{{physical.pierce}}', absorptions.physical.pierce?.toString());
    this.display = this.display.replace('{{magic.magic}}', absorptions.magic.magic?.toString());
    this.display = this.display.replace('{{magic.fire}}', absorptions.magic.fire?.toString());
    this.display = this.display.replace('{{magic.lightning}}', absorptions.magic.lightning?.toString());
    this.display = this.display.replace('{{magic.holy}}', absorptions.magic.holy?.toString());
    this.display = this.display.replace('{{resistances.poison}}', resistances.poisonImmune ? 'Immune' : resistances.poison?.toString());
    this.display = this.display.replace('{{resistances.scarletRot}}', resistances.scarletRotImmune ? 'Immune' : resistances.scarletRot?.toString());
    this.display = this.display.replace('{{resistances.hemorrhage}}', resistances.hemorrhageImmune ? 'Immune' : resistances.hemorrhage?.toString());
    this.display = this.display.replace('{{resistances.frostbite}}', resistances.frostbiteImmune ? 'Immune' : resistances.frostbite?.toString());
    this.display = this.display.replace('{{resistances.sleep}}', resistances.sleepImmune ? 'Immune' : resistances.sleep?.toString());
    this.display = this.display.replace('{{resistances.madness}}', resistances.madnessImmune ? 'Immune' : resistances.madness?.toString());
    this.display = this.display.replace('{{resistances.deathBlight}}', resistances.deathBlightImmune ? 'Immune' : resistances.deathBlight?.toString());

    this.highlight.highlightAll();
  }
}
