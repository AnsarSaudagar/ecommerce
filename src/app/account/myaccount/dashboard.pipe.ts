import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars'
})
export class DashboardPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    return value.replace(/./g, '*');
  }

}
