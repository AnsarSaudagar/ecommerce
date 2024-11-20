import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date | string | number, ...args: any[]): any {
    if (!value) {
      return '';
    }
    const formatted = formatDistanceToNow(new Date(value), { addSuffix: true });
    return formatted.replace(/about\s/, ''); // Remove the word "about"
  }

}
