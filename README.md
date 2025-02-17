ember-interactive-table
==============================================================================

[Short description of the addon.]

Installation
------------------------------------------------------------------------------

```
ember install ember-interactive-table
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-interactive-table`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).


Document qpKey, objectKeyPath and arrayObjectKeyPath.

cjangr type=date to dateFormat in queryParamsArray.

type=array

Document that the parent must get the dot, to have nested params, and avoind the dotn in the URL.
  eg
     key: 'pathogen',
    parent: 'filter.tool_options',
    defaultValue: ['hiv', 'tb', 'breastcarcinoma'],
    type: 'array',
  qp in UI url is just `pathogen` but in request it is `filter[tool_options][pathogen]`
