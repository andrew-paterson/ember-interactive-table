import { helper } from '@ember/component/helper';
import { get } from '@ember/object';

export default helper(function extract([path, fn]) {
  return function (object) {
    fn(get(object, path));
  };
});
