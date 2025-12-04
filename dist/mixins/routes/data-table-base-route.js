import Mixin from '@ember/object/mixin';

var dataTableBaseRoute = Mixin.create({
  queryParams: {
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
  }
});

export { dataTableBaseRoute as default };
//# sourceMappingURL=data-table-base-route.js.map
