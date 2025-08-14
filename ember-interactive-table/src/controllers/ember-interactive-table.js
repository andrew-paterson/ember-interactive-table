import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
export default class EmberInteractiveTableController extends Controller {
  @tracked sort;
  @tracked size;
  @tracked page;

  @action
  setSortParams(newSortField, defaultDirection = 'desc') {
    // - means desc.
    var currentSortFieldName = this.sort.replace('-', '');
    var newSortDirection;
    if (currentSortFieldName === newSortField) {
      newSortDirection = this.sort.split('')[0] === '-' ? 'asc' : 'desc';
    } else {
      newSortDirection = defaultDirection;
    }
    newSortDirection = newSortDirection.replace('desc', '-').replace('asc', '');
    this.sort = `${newSortDirection}${newSortField}`;
  }

  @action
  clearAllFilters() {
    this.refreshModel();
  }
}
