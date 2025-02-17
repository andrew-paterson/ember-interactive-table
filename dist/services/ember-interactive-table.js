import Service from '@ember/service';

class EmberInteractiveTableService extends Service {
  queryParams = {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    },
    sort: {
      refreshModel: true
    },
    trashed: {
      refreshModel: true
    }
  };
}

export { EmberInteractiveTableService as default };
//# sourceMappingURL=ember-interactive-table.js.map
