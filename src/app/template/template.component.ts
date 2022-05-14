import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { CombatStats } from '../combat-stats';

@Component({
  selector: 'app-template[stats]',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css' ]
})
export class TemplateComponent {

  copied = false;

  @Input() stats?: CombatStats;

  @ViewChild('wrapper') private wrapper!: ElementRef<HTMLElement>;

  constructor() { }

  async copyFormatted(): Promise<void> {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([this.wrapper.nativeElement.innerHTML], {type: "text/html"}),
        "text/plain": new Blob([this.wrapper.nativeElement.innerText], {type: "text/plain"}),
      })
    ]);

    this.copied = true;
    setTimeout(() => this.copied = false, 2000);
  }

}
