import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { CombatStats } from '../combat-stats';

@Component({
  selector: 'app-template[stats]',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css' ]
})
export class TemplateComponent {

  copied = false;

  @Input() stats!: CombatStats;

  @ViewChild('wrapper') private wrapper!: ElementRef<HTMLElement>;

  get showNewGameTable(): boolean {
    return [this.stats.health, this.stats.defense, this.stats.runes]
            .some(array => array.slice(1).some(value => value !== null)) ||
        this.hasNewGameResistances;
  }

  get hasNewGameResistances(): boolean {
    return Object.values(this.stats.resistances).some(array =>
        array !== null && array.slice(1).some(value => value !== null));
  }

  constructor() { }

  async copyFormatted(): Promise<void> {
    // Details blocks should default to closed on Fextralife itself.
    const html = this.wrapper.nativeElement.innerHTML
        .replace(/<details open>/, '<details>');

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
