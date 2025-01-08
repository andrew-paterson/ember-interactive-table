import Service from '@ember/service';

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
