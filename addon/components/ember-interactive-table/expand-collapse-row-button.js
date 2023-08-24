import { tracked } from '@glimmer/tracking';
import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../../templates/components/ember-interactive-table/expand-collapse-row-button';

@templateLayout(layout)
@tagName('')
export default class ExpandCollapseRowButton extends Component {
  @tracked expanded;
  @tracked showText;
  @tracked hideText;

  dataTestClass = 'eit-expand-collapse-row-button';

  get expandCollapseIcon() {
    var icon = this.expanded
      ? 'svg-repo/icons/icon-arrow-up'
      : 'svg-repo/icons/icon-arrow-down';
    return icon;
  }

  get expandCollapseText() {
    return this.expanded ? this.hideText : this.showText;
  }
}
