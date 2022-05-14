import {Pipe, PipeTransform} from '@angular/core';
import escapeStringRegexp from 'escape-string-regexp';

/** Performs a simple string replace. */
@Pipe({name: 'replace'})
export class ReplacePipe implements PipeTransform {
  transform(value: string, search: string, replace: string): string {
    return value.replace(
        new RegExp(escapeStringRegexp(search), 'g'), replace);
  }
}
