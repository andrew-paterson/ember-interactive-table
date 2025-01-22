import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<button\n  {{on \"click\" @toggleExpanded}}\n  data-test-class={{this.dataTestClass}}\n  class=\"expand-collapse-button btn-content\"\n  ...attributes\n>\n  {{#let (component this.expandCollapseIcon) as |ExpandCollapseIcon|}}\n    <ExpandCollapseIcon\n      class={{concat\n        \"fill-gray-light\"\n        (if this.expandCollapseText \" margin-right\")\n      }}\n    />\n  {{/let}}\n  {{this.expandCollapseText}}\n</button>");

class ExpandCollapseRowButton extends Component {
  static {
    g(this.prototype, "expanded", [tracked]);
  }
  #expanded = (i(this, "expanded"), undefined);
  static {
    g(this.prototype, "showText", [tracked]);
  }
  #showText = (i(this, "showText"), undefined);
  static {
    g(this.prototype, "hideText", [tracked]);
  }
  #hideText = (i(this, "hideText"), undefined);
  dataTestClass = 'eit-expand-collapse-row-button';
  get expandCollapseIcon() {
    var icon = this.args.expanded ? 'svg-repo/icons/icon-arrow-up' : 'svg-repo/icons/icon-arrow-down';
    return icon;
  }
  get expandCollapseText() {
    return this.args.expanded ? this.args.hideText : this.args.showText;
  }
}
setComponentTemplate(TEMPLATE, ExpandCollapseRowButton);

export { ExpandCollapseRowButton as default };
//# sourceMappingURL=expand-collapse-row-button.js.map
