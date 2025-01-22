import { action } from '@ember/object';
import Component from '@glimmer/component';
import './data-table.css';
import './filtering-controls.css';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<table class=\"data-table\" ...attributes>\n  {{yield}}\n</table>");

class DataTable extends Component {
  selectAll(prop, value) {
    this.model.forEach(item => {
      item[prop] = value;
    });
  }
  static {
    n(this.prototype, "selectAll", [action]);
  }
}
setComponentTemplate(TEMPLATE, DataTable);

export { DataTable as default };
//# sourceMappingURL=data-table.js.map
