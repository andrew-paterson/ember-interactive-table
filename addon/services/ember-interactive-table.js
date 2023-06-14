import Service from '@ember/service';
import _merge from 'lodash/merge';
import objectFromPath from 'ember-sundries/utils/object-from-path';
import { get } from '@ember/object';

export default class EmberInteractiveTableService extends Service {
  get queryParams() {
    return {
      page: {
        refreshModel: true,
      },
      size: {
        refreshModel: true,
      },
      sort: {
        refreshModel: true,
      },
      trashed: {
        refreshModel: true,
      }
    };
  }

  buildQueryParams(params, name) {
    var queryParamsFilters = get(this, name);
    var qpObjects = [];
    queryParamsFilters.forEach((prop) => {
      delete prop.value;
      prop = this.getParamValue(params, prop);
      if (prop.testFunction) {
        prop.testFunction(prop, params);
      }
      if (prop.value) {
        var path = prop.parent ? `${prop.parent}.${prop.key}` : prop.key;
        qpObjects.push(objectFromPath(path, prop.value));
      }
    });

    var final = {};
    var acc = final;
    qpObjects.forEach((item) => {
      acc = _merge(acc, item);
    });
    return final;
  }

  getParamValue(params, prop) {
    var propKey = prop.qpKey || prop.key;
    if (params[propKey]) {
      prop.value = params[propKey];
    } else {
      return prop;
    }
    if (prop.type === 'array') {
      if (typeof prop.value === 'string') {
        prop.value = prop.value.split(',');
      }
      if (prop.filtersForm) {
        prop.filtersForm.options = prop.filtersForm.options || [];
        if (prop.value.length === prop.filtersForm.options.length) {
          prop.value = null;
        }
      }
    }
    return prop;
  }
}
