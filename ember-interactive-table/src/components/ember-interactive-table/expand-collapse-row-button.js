import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import IconArrowUpComponent from '../svg/arrow-up.js';
import IconArrowDownComponent from '../svg/arrow-down.js';

export default class ExpandCollapseRowButton extends Component {
  @tracked expanded;
  @tracked showText;
  @tracked hideText;

  get expandCollapseIcon() {
    var icon = this.args.expanded
      ? IconArrowUpComponent
      : IconArrowDownComponent;
    return icon;
  }

  get expandCollapseText() {
    return this.args.expanded ? this.args.hideText : this.args.showText;
  }
}
