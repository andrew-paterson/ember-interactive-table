import Service from '@ember/service';
import _merge from 'lodash/merge';
import objectFromPath from 'ember-sundries/utils/object-from-path';

export default class EmberInteractiveTableService extends Service {
  queryParams = {
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
    },
  };
}
