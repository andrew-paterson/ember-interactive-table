import Component from '@ember/component';
import layout from '../../templates/components/ember-interactive-table/data-table-row';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',

  expandCollapseIcon: computed('expanded', function() {
    var icon = this.get('expanded') ? 'svg-repo/icons/icon-dash' : 'svg-repo/icons/icon-plus';
    return icon;
  }),

  actions: {
    expandRow: function() {
      this.toggleProperty('expanded');
    },

    toggleSelected: function(item) {
      item.toggleProperty("selected");
    },
  }
});