import { helper } from '@ember/component/helper';

function oddOrEven(params) {
  if (isEven(params[0])) {
    return 'even';
  } else if (isOdd(params[0])) {
    return 'odd';
  } else {
    return;
  }
}
function isEven(n) {
  return n % 2 === 0;
}
function isOdd(n) {
  return Math.abs(n % 2) === 1;
}
var oddOrEven$1 = helper(oddOrEven);

export { oddOrEven$1 as default, oddOrEven };
//# sourceMappingURL=odd-or-even.js.map
