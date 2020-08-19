import Component from '@ember/component';
import layout from '../../templates/components/ember-interactive-table/data-table-row';

export default Component.extend({
  layout,
  tagName: '',

  actions: {
    toggleExpanded: function() {
      this.toggleProperty('expanded');
    },

    toggleSelected: function(item) {
      item.toggleProperty("selected");
    },
  }
});