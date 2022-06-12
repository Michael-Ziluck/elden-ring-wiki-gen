/// <reference types="gapi" />
/// <reference types="gapi.client.sheets" />

import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, mergeMap, startWith, map } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { BASE_TEMPLATE } from './base-template';
import { HighlightService } from './highlight.service';
import { CombatStats } from './combat-stats';
import { TemplateComponent } from './template/template.component';
import { EnemyInfo } from './enemy-info';
import { damageTypes } from './damage';
import { statusTypes, inflictedStatusTypes, resistedStatusTypes } from './status';

const GAPI_API_KEY = 'AIzaSyDEQkGI_2t7LXHP0qhSnEDmQgMzP1SqIcw';

const GAPI_DISCOVERY_DOC =
    'https://sheets.googleapis.com/$discovery/rest?version=v4';

declare global {
  interface Window {
    gapiReady: Promise<void>;
  }
}

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
    stance: [0],
    parriable: [false],
    parriesPerCrit: [1],
    critable: [true],
    optional: [true],
    multiplayerAllowed: [true],
    summonsAllowed: [true],
    inflictedDamageTypes: this.fb.group({
      standard: [false],
      slash: [false],
      strike: [false],
      pierce: [false],
      magic: [false],
      fire: [false],
      lightning: [false],
      holy: [false],
    }),
    inflictedStatusTypes: this.fb.group({
      poison: [false],
      scarletRot: [false],
      hemorrhage: [false],
      frostbite: [false],
      deathBlight: [false],
    }),
    absorptions: this.fb.group({
      standard: [0],
      slash: [0],
      strike: [0],
      pierce: [0],
      magic: [0],
      fire: [0],
      lightning: [0],
      holy: [0],
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

  displayForm: FormGroup = this.fb.group({
    display: ['full'],
  });

  private readonly gapiClient: Promise<typeof gapi.client> =
      new Promise(async resolve => {
    (await this._waitForGapi()).load('client', () => {
      resolve((async () => {
        await gapi.client.init({
          apiKey: GAPI_API_KEY,
          discoveryDocs: [GAPI_DISCOVERY_DOC],
        });
        return gapi.client;
      })());
    });
  });

  /**
   * A map from the names of enemies in the spreadsheet to information about
   * each enemy. The keys are suitable for use in autocompletion.
   */
  enemyInfo: Promise<Map<string, EnemyInfo>> = (async () => {
    const response = await (await this.gapiClient).sheets.spreadsheets.values.get({
      spreadsheetId: '1aujq95UfL_oUs3voPt3nGqM1hLhaVJOj6JKB6Np3FD8',
      range: 'Stat_Data!A2:E',
    });

    if (!response.result.values) return new Map();

    // Remove unused rows and add the 1-based indices of the original rows so we
    // can look up more data later.
    const rows = response.result.values
        .map((row, i) => [...row, i + 2])
        .filter(row => row[3] !== '???' && row[4] !== 'Unused');;

    // Count how many rows there are with the same name so we know if we need to
    // disambiguate based on NPC ID.
    const countByName = new Map<string, number>();
    for (const row of rows) {
      countByName.set(row[3], (countByName.get(row[3]) ?? 0) + 1);
    }

    const result = new Map<string, EnemyInfo>();
    for (const row of rows) {
      let name = row[3];
      if (countByName.get(name)! > 1) name += ` (${row[0]})`;
      result.set(name, {
        name,
        rowIndex: row[5],
        id: row[0],
        friendlyName: row[3].replace(/\[[^\]]+\]|\([^\)]\)| - .*/g, '').trim()
      });
    }

    return result;
  })();

  filteredNames: Observable<EnemyInfo[]>;

  @ViewChild(MatAutocomplete) autocomplete!: MatAutocomplete;

  @ViewChild(TemplateComponent) template!: TemplateComponent;

  readonly damageTypes = damageTypes;

  readonly statusTypes = statusTypes;

  readonly inflictedStatusTypes = inflictedStatusTypes;

  readonly resistedStatusTypes = resistedStatusTypes;

  constructor(
    private fb: FormBuilder,
    private highlight: HighlightService,
  ) {
    this.filteredNames = this.combatForm.controls['name'].valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      mergeMap(value => this._filterName(value))
    );
  }

  displayEnemyInfo(info: EnemyInfo): string {
    return info.friendlyName;
  }

  private async _filterName(name: string): Promise<EnemyInfo[]> {
    if (name.length < 4) return [];

    const chunks = name.toLowerCase().split(' ');
    return [...(await this.enemyInfo).entries()]
        .filter(([name, info]) =>
            chunks.every(chunk => name.toLowerCase().includes(chunk)))
        .map(([_, info]) => info);
  }

  private _waitForGapi(): Promise<typeof gapi> {
    if (gapi) return Promise.resolve(gapi);

    return new Promise(resolve => {
      setTimeout(() => resolve(this._waitForGapi()), 100);
    });
  }

  async enemyInfoSelected(event: MatAutocompleteSelectedEvent): Promise<void> {
    const info = event.option.value as EnemyInfo;
    const responses = await Promise.all([
      'Stat_Data',
      'Stat_Data_(NG+)',
      ...[...new Array(6).keys()].map(i => `Stat_Data_(NG+${i + 2})`)
    ].map(async sheet =>
      await (await this.gapiClient).sheets.spreadsheets.values.get({
        spreadsheetId: '1aujq95UfL_oUs3voPt3nGqM1hLhaVJOj6JKB6Np3FD8',
        range: `${sheet}!A${info.rowIndex}:AX${info.rowIndex}`,
      })));
    const newGames = responses.map(response => {
      const result = response.result.values;
      return result ? result[0] : null;
    });
    if (newGames.some(newGame => !newGame)) return;

    this.combatForm.controls['stance'].setValue(newGames[0]![17]);

    const absorptions = this.combatForm.controls['absorptions'] as FormGroup;
    absorptions.controls['standard'].setValue(newGames[0]![9]);
    absorptions.controls['slash'].setValue(newGames[0]![10]);
    absorptions.controls['strike'].setValue(newGames[0]![11]);
    absorptions.controls['pierce'].setValue(newGames[0]![12]);
    absorptions.controls['magic'].setValue(newGames[0]![13]);
    absorptions.controls['fire'].setValue(newGames[0]![14]);
    absorptions.controls['lightning'].setValue(newGames[0]![15]);
    absorptions.controls['holy'].setValue(newGames[0]![16]);

    this.setNewGameValues('health', newGames as string[][], 7);
    this.setNewGameValues('defense', newGames as string[][], 8);
    if (newGames[0]![6] !== '0') {
      this.setNewGameValues('runes', newGames as string[][], 6);
    }

    this.setResistance('poison', newGames as string[][], 0);
    this.setResistance('scarletRot', newGames as string[][], 1);
    this.setResistance('hemorrhage', newGames as string[][], 2);
    this.setResistance('frostbite', newGames as string[][], 3);
    this.setResistance('sleep', newGames as string[][], 4);
  }

  private setNewGameValues(
      field: string, newGames: string[][], index: number): void {
    this.combatForm.controls[field].setValue(
        newGames.map(row => row[index].replace(/,/g, '')));
  }

  private setResistance(
      field: string, newGames: string[][], offset: number): void {
    const group = this.combatForm.controls['resistances'] as FormGroup;
    const control = group.controls[field];
    if (newGames[0][18 + offset] === 'IMMUNE') {
      control.setValue(null);
      return;
    }

    control.setValue([
      this.resistancesForGame(newGames[0], 18 + offset),
      ...[...new Array(7).keys()].map(i => {
        const game = newGames[i + 1];
        return game ? this.resistancesForGame(game, 9 + offset) : [];
      })
    ]);
  }

  private resistancesForGame(game: string[], index: number): string[] {
    const values =
        [game[index], game[index + 7], game[index + 12], game[index + 17]]
            .map(value => value.replace(/,/g, ''));

    while (values.length > 2 &&
        values[values.length - 1] === values[values.length - 2]) {
      values.length -= 1;
    }

    return values;
  }
}
