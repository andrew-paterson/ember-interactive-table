import Mixin from '@ember/object/mixin';

export default Mixin.create({
  queryParams: {
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
  },
});
