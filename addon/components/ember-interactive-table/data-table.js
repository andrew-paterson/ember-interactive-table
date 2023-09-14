import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class DataTable extends Component {
  @action
  selectAll(prop, value) {
    this.model.forEach((item) => {
      item[prop] = value;
    });
  }
}
