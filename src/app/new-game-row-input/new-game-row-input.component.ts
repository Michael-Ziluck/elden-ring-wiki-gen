import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: '[new-game-row-input]',
  templateUrl: './new-game-row-input.component.html',
  styleUrls: ['./new-game-row-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NewGameRowInputComponent
    }
  ]
})
export class NewGameRowInputComponent {

  @Input() name!: string;

  value: Array<number|null> = [];

  onChange = (value: Array<number|null>) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  writeValue(value: Array<number|null>): void {
    this.value = value;
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

  changeValue(i: number, value: number|null): void {
    this.value[i] = value;
    this.markAsTouched();
    this.onChange(this.value);
  }

}
