import Component from '@ember/component';
import layout from '../../templates/components/ember-interactive-table/interactive-table-frame';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  classNameBindings: ['deletionPending:deletion-pending'],

  didInsertElement() {
    if (!this.get('singleRecordName')) {
      this.set('singleRecordName', 'item');
    } 
    if (!this.get('pluralRecordName')) {
      this.set('pluralRecordName', `${this.get('singleRecordName')}s`);
    }
  },

  filtersActive: computed('modelMetaData', function() {
    return this.get('modelMetaData.filtered_data_length') < this.get('modelMetaData.total_data_length');
  }),
  
});
