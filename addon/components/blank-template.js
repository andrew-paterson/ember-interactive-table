import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/blank-template';

@templateLayout(layout)
@tagName('')
export default class BlankTemplate extends Component {}
