import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'resistance-input',
  templateUrl: './resistance-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ResistanceInputComponent
    }
  ]
})
export class ResistanceInputComponent {

  onChange = (quantity: number|null) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  _quantity = 100;

  _immune = false;

  get value(): number|null {
    return this._immune ? null : this._quantity;
  }

  set value(value: number|null) {
    if (value) {
      this._quantity = value;
      this._immune = false;
    } else {
      this._immune = true;
    }
  }

  constructor() { }

  writeValue(quantity: number|null): void {
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

  changeQuantity(quantity: number|null): void {
    this._quantity = quantity ?? 0;
    this.markAsTouched();
    this.onChange(this.value);
  }

  changeImmunity(immune: boolean): void {
    this._immune = immune;
    this.markAsTouched();
    this.onChange(this.value);
  }

}
