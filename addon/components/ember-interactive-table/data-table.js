import Component from '@ember/component';
import layout from '../../templates/components/ember-interactive-table/data-table';

export default Component.extend({
  layout,
  tagName: "table",
  classNames: ['data-table'],

  actions: {
    selectAll: function(prop, value) {
      this.model.setEach(prop, value);
    }
  }
});
