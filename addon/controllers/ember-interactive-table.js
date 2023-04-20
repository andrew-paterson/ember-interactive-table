import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  emberInteractiveTable: service(),

  init() {
    this._super(...arguments);
    if (this.get('queryParamsArray')) {
      this.queryParams = (this.queryParams || []).concat(this.get('queryParamsArray.items').map(item => { return item.qpKey || item.key; }) || []);
      this.send('applyDefaults');
      var queryParamsName = this.get('queryParamsArray.name');
      this.set(`emberInteractiveTable.${queryParamsName}`, this.get('queryParamsArray.items'));
    }
  },

  actions: {
    applyDefaults() {
      var queryParamsArray = this.get('queryParamsArray') || [];
      queryParamsArray.items.forEach(qpObject => {
        if (Array.isArray(qpObject.defaultValue)) {
          qpObject.defaultValue = qpObject.defaultValue.join(',');
        }
        this.set(qpObject.key, qpObject.defaultValue);
      });
    },

    setSortParams(newSortField, defaultDirection = 'desc') {
      // - means desc.
      var currentSortFieldName = this.get('sort').replace('-', '');
      var newSortDirection;
      if (currentSortFieldName === newSortField) {
        newSortDirection = this.get('sort').split('')[0] === '-' ? 'asc' : 'desc'; 
      } else {
        newSortDirection = defaultDirection;
      } newSortDirection = newSortDirection.replace('desc', '-').replace('asc', '');
      this.set('sort', `${newSortDirection}${newSortField}`);
    },  

    clearAllFilters: function() {
      this.send('applyDefaults');
      this.send('refreshModel');
    },

    applyFilters(filterFormValues) {
      var queryParamsArray = this.get('queryParamsArray.items') || [];
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
        this.set(key, value);
      }
      setTimeout(() => { // TODO undesirable
        this.send('refreshModel');
      })
    },
  }
});
