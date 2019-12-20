import Component from '@ember/component';
import layout from '../../../templates/components/hyrax-ember-assets/interactive-table/table-container';

export default Component.extend({
  layout,
  classNames: ["data-table-container"],
  classNameBindings: ["trashed:viewing-trashed-items"],
});
