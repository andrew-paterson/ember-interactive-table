import _merge from 'lodash/merge';
import objectFromPath from 'ember-sundries/utils/object-from-path';

export default function buildRequestParams(queryParams, queryParamsObjects) {
  var qpObjects = [];
  queryParamsObjects.forEach((qpObject) => {
    delete qpObject.value;
    qpObject = setQpObjectValue(queryParams, qpObject);
    if (qpObject.customTransforms) {
      qpObject.customTransforms(qpObject, queryParams);
    }
    if (qpObject.value) {
      var path = qpObject.parent
        ? `${qpObject.parent}.${qpObject.key}`
        : qpObject.key;
      qpObjects.push(objectFromPath(path, qpObject.value));
    }
  });

  var final = {};
  var acc = final;
  qpObjects.forEach((item) => {
    acc = _merge(acc, item);
  });
  return final;
}

function setQpObjectValue(queryParams, qpObject) {
  var propKey = qpObject.qpKey || qpObject.key;
  if (queryParams[propKey]) {
    qpObject.value = queryParams[propKey];
  } else {
    return qpObject;
  }
  if (qpObject.type === 'array') {
    if (typeof qpObject.value === 'string') {
      qpObject.value = qpObject.value.split(',');
    }
    if (qpObject.filtersForm) {
      qpObject.filtersForm.options = qpObject.filtersForm.options || [];
      if (qpObject.value.length === qpObject.filtersForm.options.length) {
        qpObject.value = null;
      }
    }
  }
  return qpObject;
}
