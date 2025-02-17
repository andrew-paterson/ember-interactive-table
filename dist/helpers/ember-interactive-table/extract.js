import { helper } from '@ember/component/helper';
import { get } from '@ember/object';

var extract = helper(function extract([path, fn]) {
  return function (object) {
    fn(get(object, path));
  };
});

export { extract as default };
//# sourceMappingURL=extract.js.map
