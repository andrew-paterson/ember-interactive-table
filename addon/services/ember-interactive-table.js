import Service from '@ember/service';
import _merge from 'lodash/merge';

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
