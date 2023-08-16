import EmberObject from '@ember/object';
import EmberInteractiveTableMixin from 'ember-interactive-table/mixins/ember-interactive-table';
import { module, test } from 'qunit';

module('Unit | Mixin | ember-interactive-table', function () {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let EmberInteractiveTableObject = EmberObject.extend(
      EmberInteractiveTableMixin
    );
    let subject = EmberInteractiveTableObject.create();
    assert.ok(subject);
  });
});
