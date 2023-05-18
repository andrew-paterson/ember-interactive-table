import Component from '@ember/component';
import layout from '../../templates/components/ember-interactive-table/data-table-row';

export default Component.extend({
  layout,
  tagName: '',

  actions: {
    toggleExpanded: function () {
      this.toggleProperty('expanded');
    },

    toggleSelected: function (item, value, event) {
      if (!item) {
        console.warn(
          'You have not passed a model to the @record property of the DataTableRow component. This must be passed so that the component knows what to toggle the selected state of.'
        );
        return;
      }
      item.toggleProperty('selected');
      if (!this.onSelect) {
        console.warn(
          'Please pass an action as the onSelect property of data-table-row in order to react to table row selection.'
        );
        return;
      }
      this.onSelect(value, event, item);
    },
  },
});
