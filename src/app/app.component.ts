/// <reference types="gapi" />
/// <reference types="gapi.client.sheets" />

import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BASE_TEMPLATE } from './base-template';
import { HighlightService } from './highlight.service';
import { Observable, mergeMap, startWith, map } from 'rxjs';
import { CombatStats } from './combat-stats';
import { TemplateComponent } from './template/template.component';
import { EnemyInfo } from './enemy-info';

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

  @ViewChild(TemplateComponent) template!: TemplateComponent;

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
}
