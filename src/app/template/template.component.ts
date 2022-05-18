import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { CombatStats } from '../combat-stats';
import { findLastIndex } from '../utils';

@Component({
  selector: 'app-template[stats]',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css' ]
})
export class TemplateComponent {

  copied = false;

  @Input() stats!: CombatStats;

  @ViewChild('wrapper') private wrapper!: ElementRef<HTMLElement>;

  get hasNewGameResistances(): boolean {
    return Object.values(this.stats.resistances).some(array =>
        array !== null && array.slice(1).some(value => value.length > 0));
  }

  get hasMultipleResistanceProcs(): boolean {
    return Object.values(this.stats.resistances).some(array =>
        array !== null && array.some(child => child.length > 1));
  }

  get highestNewGame(): number {
    const result = Math.max(
      ...[
        this.stats.health, this.stats.defense, this.stats.runes,
      ].map(array => findLastIndex(array, value => !!value)),
      ...Object.values(this.stats.resistances).map(array =>
          array === null
              ? 0
              : findLastIndex(array, child => child.length > 0))
    );
    return result === -1 ? 0 : result;
  }

  get enemyName(): string {
    const name = this.stats.name;
    return typeof name === 'string' ? name : name.friendlyName;
  }

  isArray(value: unknown): boolean {
    return value instanceof Array;
  }

  hasNewGameValues(array?: unknown[]): boolean {
    if (!array) return false;
    return findLastIndex(array, value => !!value) > 0;
  }

  async copyFormatted(): Promise<void> {
    const html = this.wrapper.nativeElement.innerHTML
        // Details blocks should default to closed on Fextralife itself.
        .replace(/<details ([^>]+ )?open="">/g, '<details>')
        // Angular adds a bunch of comments that we don't need.
        .replace(/<!--(.|\n)*?-->/mg, '');

    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([html], {type: "text/html"}),
        "text/plain": new Blob([this.wrapper.nativeElement.innerText], {type: "text/plain"}),
      })
    ]);

    this.copied = true;
    setTimeout(() => this.copied = false, 2000);
  }

}
