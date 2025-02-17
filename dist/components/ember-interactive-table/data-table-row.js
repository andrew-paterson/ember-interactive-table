import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<tr\n  class=\"{{ember-interactive-table/odd-or-even @index}}\"\n  data-test-class=\"eit-data-table-row\"\n  data-test-id=\"{{@dataTestId}}\"\n  {{did-insert this.didInsert}}\n  ...attributes\n>\n  {{#unless @hideExpandCollapse}}\n    <td class=\"expand-collapse-cell\">\n      {{ember-interactive-table/expand-collapse-row-button\n        expanded=this.expanded\n        toggleExpanded=this.toggleExpanded\n      }}\n    </td>\n  {{/unless}}\n  {{#unless @hideSelectRow}}\n    <td class=\"select\"><EmberSundries::LabelledCheckbox\n        @changedAction={{fn this.toggleSelected @record}}\n        @value={{@record.selected}}\n      /></td>\n  {{/unless}}\n  {{yield (hash mainRow=(component \"blank-template\" tagName=\"\"))}}\n</tr>\n{{#if this.expanded}}\n  <tr\n    class=\"data-table-row-expanded\n      {{ember-interactive-table/odd-or-even @index}}\"\n    data-test-class=\"eit-data-table-row-extended\"\n  >\n    <td colspan=\"1000\">\n      <div class=\"flex flex-align-start\">\n        {{ember-interactive-table/expand-collapse-row-button\n          class=\"margin-right-lg\"\n          expanded=this.expanded\n          toggleExpanded=this.toggleExpanded\n        }}\n        <div class=\"data-table-row-expanded-content flex-expand\">\n          {{yield (hash expandedRow=(component \"blank-template\" tagName=\"\"))}}\n        </div>\n        <button\n          class=\"btn-content hide-details-icon close-button\"\n          {{on \"click\" this.toggleExpanded}}\n        >\n          {{@svg-repo/icons/icon-cross}}\n        </button>\n      </div>\n    </td>\n  </tr>\n{{/if}}");

class DataTableRow extends Component {
  static {
    g(this.prototype, "expanded", [tracked]);
  }
  #expanded = (i(this, "expanded"), undefined);
  didInsert(element) {
    if (this.args.didInsertDataTableRow) {
      this.args.didInsertDataTableRow(this, element);
    }
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
  toggleExpanded() {
    this.expanded = !this.expanded; // this.toggleProperty
  }
  static {
    n(this.prototype, "toggleExpanded", [action]);
  }
  toggleSelected(item, value, event) {
    if (!item) {
      console.warn('You have not passed a model to the @record property of the DataTableRow component. This must be passed so that the component knows what to toggle the selected state of.');
      return;
    }
    item.toggleProperty('selected');
    if (!this.args.onSelect) {
      console.warn('Please pass an action as the onSelect property of data-table-row in order to react to table row selection.');
      return;
    }
    this.args.onSelect(value, event, item);
  }
  static {
    n(this.prototype, "toggleSelected", [action]);
  }
}
setComponentTemplate(TEMPLATE, DataTableRow);

export { DataTableRow as default };
//# sourceMappingURL=data-table-row.js.map
