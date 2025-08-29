# Ember interactive table

This addon provides various assets to display and manage a table of data with JSONAPI flavoured sorting, pagination and filtering.

## buildRequestParams util

```javascript
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import buildRequestParams from 'ember-interactive-table/utils/build-request-params';

export default class IndexRoute extends AuthenticatedRoute {
  model(params) {
    var queryParams = buildRequestParams(params, queryParamsObjects);
    return this.store.query('post', queryParams);
  }
}
```

The `buildRequestParams` util builds a query params object which can be passed to Ember Adapter methods like `store.query`. The adapter will then build these params into the request url which is hit when the model hook is called.

It has the following properties:

1. `paramName`

- **Required**
- The name of the query param as defined in the contolller, in the `queryParams` array.

2. `requestParamsPath`

- **Optional**
- The path of the param in the query params that are used to build the request url.
- Only required it is differernt than the `paramName`.

3. `eitSetQpValueFunc`

- **Optional**
- A function which can be used to manipulate the value of the query param in the request url.

```javascript
const buildRequestParams = [
  {
    paramName: 'status', // The name of the query param as defined in the contolller, in the `queryParams` array.
    requestParamsPath: 'filter.status', // The path of the query param in the query params that are used to build the request url.
    eitSetQpValueFunc(qpObject) {
      let value = qpObject.value;
      // Remove the `filter.status` prop from the request url if all possible statuses are included in the value of the status param, because this essentially means don't filter on status.
      const allPossibleOptions = ['drafted', 'reviewed', 'approved'];
      if (value.sort().join(',') === allPossibleOptions.sort().join(',')) {
        value = null;
      }
      return value;
    },
  },
];
```
