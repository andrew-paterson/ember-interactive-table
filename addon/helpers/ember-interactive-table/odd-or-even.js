import { helper } from '@ember/component/helper';

export function oddOrEven(params) {
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

export default helper(oddOrEven);
