import { action } from '@ember/object';
import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/ember-interactive-table/data-table';

@templateLayout(layout)
@tagName('')
export default class DataTable extends Component {
  @action
  selectAll(prop, value) {
    this.model.forEach((item) => {
      item[prop] = value;
    });
  }
}
