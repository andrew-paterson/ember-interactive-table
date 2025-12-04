import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { g, i, n } from 'decorator-transforms/runtime';

class EmberInteractiveTableController extends Controller {
  static {
    g(this.prototype, "sort", [tracked]);
  }
  #sort = (i(this, "sort"), undefined);
  static {
    g(this.prototype, "size", [tracked]);
  }
  #size = (i(this, "size"), undefined);
  static {
    g(this.prototype, "page", [tracked]);
  }
  #page = (i(this, "page"), undefined);
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
  static {
    n(this.prototype, "setSortParams", [action]);
  }
  clearAllFilters() {
    this.refreshModel();
  }
  static {
    n(this.prototype, "clearAllFilters", [action]);
  }
}

export { EmberInteractiveTableController as default };
//# sourceMappingURL=ember-interactive-table.js.map
