import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<svg\n  xmlns=\'http://www.w3.org/2000/svg\'\n  viewBox=\'0 0 50.9 19.9\'\n  class=\'single-colour icon-arrow-up\'\n  data-test-icon=\'icon-arrow-up\'\n  ...attributes\n><path\n    d=\'M0 16.9c0-1 0.5-2 1.4-2.6L23.9 0.5c1-0.6 2.2-0.6 3.1 0l22.5 13.9c1.4 0.9 1.8 2.7 1 4.1 -0.9 1.4-2.7 1.8-4.1 1l-21-12.9L4.5 19.4c-1.4 0.9-3.3 0.4-4.1-1C0.1 17.9 0 17.4 0 16.9z\'\n  /></svg>");

class IconArrowUp extends Component {}
setComponentTemplate(TEMPLATE, IconArrowUp);

export { IconArrowUp as default };
//# sourceMappingURL=arrow-up.js.map
