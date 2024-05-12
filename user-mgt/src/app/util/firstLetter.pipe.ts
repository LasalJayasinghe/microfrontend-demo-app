import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'firstLetter' })
export class FirstLetterPipe implements PipeTransform {

  transform(value: string): string {
    const split = value.split("");
    const output = split[0];
    return output;
  }

}
