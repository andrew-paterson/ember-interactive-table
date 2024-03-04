import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
export default class EmberInteractiveTableController extends Controller {
  @tracked sort;
  @tracked size;
  @tracked page;

  @action
  applyDefaults() {
    var queryParamsObjects = this.queryParamsObjects || [];
    if (queryParamsObjects) {
      queryParamsObjects.forEach((qpObject) => {
        if (Array.isArray(qpObject.defaultValue)) {
          qpObject.defaultValue = qpObject.defaultValue.join(',');
        }
        this[qpObject.key] = qpObject.defaultValue;
      });
      this.queryParams = (this.queryParams || [])
        .concat(
          queryParamsObjects.map((item) => {
            return item.qpKey || item.key;
          }) || [],
        )
        .uniq();
    }
  }

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
    this.applyDefaults();
    this.refreshModel();
  }

  @action
  applyFilters(filterFormValues) {
    var queryParamsObjects = this.queryParamsObjects || [];
    for (var key in filterFormValues) {
      var value = filterFormValues[key];
      var thisObject = queryParamsObjects.findBy('key', key) || {};
      if (thisObject.objectKeyPath) {
        value = value[thisObject.objectKeyPath];
      }
      if (thisObject.arrayObjectKeyPath) {
        value = (value || [])
          .map((item) => {
            return item[thisObject.arrayObjectKeyPath];
          })
          .join(',');
      }
      value = (value || []).length === 0 ? null : value;
      this[key] = value;
    }
    setTimeout(() => {
      // TODO undesirable
      this.refreshModel();
    });
  }
}
