import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default class EmberInteractiveTableController extends Controller {
  @service emberInteractiveTable;

  constructor(...args) {
    super(...args);
    if (this.queryParamsArray) {
      this.queryParams = (this.queryParams || []).concat(this.queryParamsArray.items.map(item => { return item.qpKey || item.key; }) || []);
      this.applyDefaults();
      var queryParamsName = this.queryParamsArray.name;
      set(this, `emberInteractiveTable.${queryParamsName}`, this.queryParamsArray.items);
    }
  }

  @action
  applyDefaults() {
    var queryParamsArray = this.queryParamsArray || [];
    queryParamsArray.items.forEach(qpObject => {
      if (Array.isArray(qpObject.defaultValue)) {
        qpObject.defaultValue = qpObject.defaultValue.join(',');
      }
      set(this, qpObject.key, qpObject.defaultValue);
    });
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
    } newSortDirection = newSortDirection.replace('desc', '-').replace('asc', '');
    set(this, 'sort', `${newSortDirection}${newSortField}`);
  }

  @action
  clearAllFilters() {
    this.send('applyDefaults');
    this.send('refreshModel');
  }

  @action
  applyFilters(filterFormValues) {
    var queryParamsArray = this.queryParamsArray.items || [];
    for (var key in filterFormValues) {
      var value = filterFormValues[key];
      var thisObject = queryParamsArray.findBy('key', key) || {};
      if (thisObject.objectKeyPath) {
        value = value[thisObject.objectKeyPath];
      }
      if (thisObject.arrayObjectKeyPath) {
        value = (value || []).map(item => {
          return item[thisObject.arrayObjectKeyPath];
        });
      }
      value = (value || []).length === 0 ? null : value;
      set(this,key, value);
    }
    setTimeout(() => { // TODO undesirable
      this.send('refreshModel');
    })
  }
}
