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
  applyDefaults() {
    var queryParamsObjects = this.queryParamsObjects || [];
    {
      queryParamsObjects.forEach(qpObject => {
        if (Array.isArray(qpObject.defaultValue)) {
          qpObject.defaultValue = qpObject.defaultValue.join(',');
        }
        this[qpObject.key] = qpObject.defaultValue;
      });
      this.queryParams = [...new Set((this.queryParams || []).concat(queryParamsObjects.map(item => {
        return item.qpKey || item.key;
      }) || []))];
    }
  }
  static {
    n(this.prototype, "applyDefaults", [action]);
  }
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
    this.applyDefaults();
    this.refreshModel();
  }
  static {
    n(this.prototype, "clearAllFilters", [action]);
  }
  applyFilters(filterFormValues) {
    var queryParamsObjects = this.queryParamsObjects || [];
    for (var key in filterFormValues) {
      var value = filterFormValues[key];
      var thisObject = queryParamsObjects.find(queryParamsObject => queryParamsObject.key === key) || {};
      if (thisObject.objectKeyPath) {
        value = value[thisObject.objectKeyPath];
      }
      if (thisObject.arrayObjectKeyPath) {
        value = (value || []).map(item => {
          return item[thisObject.arrayObjectKeyPath];
        }).join(',');
      }
      value = (value || []).length === 0 ? null : value;
      this[key] = value;
    }
    this.model.meta = {};
    setTimeout(() => {
      // TODO undesirable
      this.refreshModel();
    });
  }
  static {
    n(this.prototype, "applyFilters", [action]);
  }
}

export { EmberInteractiveTableController as default };
//# sourceMappingURL=ember-interactive-table.js.map
