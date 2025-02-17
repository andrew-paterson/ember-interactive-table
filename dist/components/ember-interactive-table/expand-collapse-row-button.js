import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import IconArrowUp from '../svg/arrow-up.js';
import IconArrowDown from '../svg/arrow-down.js';
import { ensureSafeComponent } from '@embroider/util';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<button\n  {{on \"click\" @toggleExpanded}}\n  data-test-class={{this.dataTestClass}}\n  class=\"expand-collapse-button btn-content\"\n  ...attributes\n>\n  <this.expandCollapseIcon\n    class={{concat\n      \"fill-gray-light\"\n      (if this.expandCollapseText \" margin-right\")\n    }}\n  />\n  {{this.expandCollapseText}}\n</button>");

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
    var icon = this.args.expanded ? ensureSafeComponent(IconArrowUp) : ensureSafeComponent(IconArrowDown);
    return icon;
  }
  get expandCollapseText() {
    return this.args.expanded ? this.args.hideText : this.args.showText;
  }
}
setComponentTemplate(TEMPLATE, ExpandCollapseRowButton);

export { ExpandCollapseRowButton as default };
//# sourceMappingURL=expand-collapse-row-button.js.map
