import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../../templates/components/ember-interactive-table/expand-collapse-row-button';

@templateLayout(layout)
@tagName('')
export default class ExpandCollapseRowButton extends Component {
  dataTestClass = 'eit-expand-collapse-row-button';

  @computed('expanded')
  get expandCollapseIcon() {
    var icon = this.expanded
      ? 'svg-repo/icons/icon-arrow-up'
      : 'svg-repo/icons/icon-arrow-down';
    return icon;
  }

  @computed('showText', 'hideText')
  get expandCollapseText() {
    return this.expanded ? this.hideText : this.showText;
  }
}
