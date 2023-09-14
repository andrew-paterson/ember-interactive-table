import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class DataTableRow extends Component {
  @action
  didInsert(element) {
    if (this.didInsertDataTableRow) {
      this.didInsertDataTableRow(element);
    }
  }

  @action
  toggleExpanded() {
    this.expanded = !this.expanded; // this.toggleProperty
  }

  @action
  toggleSelected(item, value, event) {
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
  }
}
