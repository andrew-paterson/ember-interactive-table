import _merge from 'lodash.merge';
import { unflatten } from 'flat';

function buildRequestParams(queryParams, queryParamsObjects) {
  var qpObjects = [];
  queryParamsObjects.forEach(qpObject => {
    delete qpObject.value;
    qpObject = setQpObjectValue(queryParams, qpObject);
    if (qpObject.customTransforms) {
      qpObject.customTransforms(qpObject, queryParams);
    }
    if (qpObject.value) {
      const path = qpObject.requestParamsPath || qpObject.paramName;
      const obj = {};
      obj[path] = qpObject.value;
      qpObjects.push(unflatten(obj));
    }
  });
  var final = {};
  var acc = final;
  qpObjects.forEach(item => {
    acc = _merge(acc, item);
  });
  return final;
}
function setQpObjectValue(queryParams, qpObject) {
  if (queryParams[qpObject.paramName]) {
    qpObject.value = queryParams[qpObject.paramName];
  } else {
    return qpObject;
  }
  if (qpObject.eitSetQpValueFunc) {
    qpObject.value = qpObject.eitSetQpValueFunc(qpObject);
  }
  return qpObject;
}

export { buildRequestParams as default };
//# sourceMappingURL=build-request-params.js.map
