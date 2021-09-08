import Component from '@ember/component';
import layout from '../../templates/components/ember-interactive-table/expand-collapse-row-button';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: 'button',
  classNames: ['expand-collapse-button', 'btn-content'],
  'data-test-class': 'eit-expand-collapse-row-button',
  click() {
    this.toggleExpanded();
  },

  expandCollapseIcon: computed('expanded', function() {
    var icon = this.expanded ? 'svg-repo/icons/icon-arrow-up' : 'svg-repo/icons/icon-arrow-down';
    return icon;
  }),

  expandCollapseText: computed('showText', 'hideText', function() {
    return this.expanded ? this.get('hideText') : this.get('showText');
  }),


});
