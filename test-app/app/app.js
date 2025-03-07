import Application from '@ember/application';
import Resolver from './resolver.js';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment.js';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
});

loadInitializers(App, config.modulePrefix);

export default App;
