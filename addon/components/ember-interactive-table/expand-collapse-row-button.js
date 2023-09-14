import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

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
