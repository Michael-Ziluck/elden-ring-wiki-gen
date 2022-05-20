import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Resistance } from '../combat-stats';
import { findLastIndex } from '../utils';

@Component({
  selector: '[resistance-input]',
  templateUrl: './resistance-input.component.html',
  styleUrls: ['./resistance-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ResistanceInputComponent
    }
  ]
})
export class ResistanceInputComponent {

  @Input() name!: string;

  onChange = (quantity: Resistance) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  _values: Array<Array<number|null>> = [[], [], [], [], [], [], [], []];

  _immune = false;

  get value(): Array<Array<number|null>>|null {
    return this._immune ? null : this._values;
  }

  set value(value: Array<Array<number|null>>|null) {
    if (value !== null) {
      this._values = value;
      this._immune = false;
    } else {
      this._immune = true;
    }
  }

  constructor() { }

  writeValue(quantity: Array<Array<number|null>>|null): void {
    this.value = quantity;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  numberOfValuesAtIndex(i: number): number {
    const values = this.value;
    if (values === null) return 0;
    return 0;
  }

  changeValue(i: number, j: number, value: number|null): void {
    this._values[i][j] = value;
    if (value === null) {
      this._values[i].length =
          findLastIndex(this._values[i], value => value !== null) + 1;
    }

    this.markAsTouched();
    this.onChange(this.value);
  }

  changeImmunity(notImmune: boolean): void {
    this._immune = !notImmune;
    this.markAsTouched();
    this.onChange(this.value);
  }

}
