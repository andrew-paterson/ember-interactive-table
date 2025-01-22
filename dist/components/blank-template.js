import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("test{{yield}}");

class BlankTemplate extends Component {}
setComponentTemplate(TEMPLATE, BlankTemplate);

export { BlankTemplate as default };
//# sourceMappingURL=blank-template.js.map
