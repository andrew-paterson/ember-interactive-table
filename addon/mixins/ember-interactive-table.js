import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import pojoFormFromQueryParams from 'ember-pojo-validating-fields/utils/form-schema-from-query-params';

export default Mixin.create({
  emberInteractiveTable: service(),

  init() {
    this._super(...arguments);
    if (this.get('queryParamsArray')) {
      this.queryParams = this.get('queryParamsArray.items').map(item => { return item.qpKey || item.key; });
      this.send('applyDefaults');
      var queryParamsName = this.get('queryParamsArray.name');
      this.set(`emberInteractiveTable.${queryParamsName}`, this.get('queryParamsArray.items'));
    }
  },

  filterFormSchema: computed('queryParamsArray', function() {
    return pojoFormFromQueryParams(this.get('queryParamsArray'));
  }),

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

    setSortParamsNew(newSortField, defaultDirection = 'desc') {
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
        if (thisObject.type === 'date' && value) {
          value = moment(value).format(thisObject.qpDateFormat || 'YYYY-MM-DDThh:mm:ss').toString();
        }
        this.set(key, value);
      }
      this.send('refreshModel');
    },
  }
});
