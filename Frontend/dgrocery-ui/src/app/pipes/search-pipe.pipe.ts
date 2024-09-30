import { Pipe, PipeTransform } from '@angular/core';
/**
 * NOT IMPLEMENTED
 *
 * @export
 * @class SearchPipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      return item.toLowerCase().includes(searchText);
    });
  }
}
