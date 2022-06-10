import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decamel'
})
export class DecamelPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(
        /([a-z])([A-Z])/g,
        (_, letter1, letter2) => `${letter1} ${letter2.toLowerCase()}`);
  }

}
