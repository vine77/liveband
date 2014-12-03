/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  'ember-cli-jquery-ui': {
    'theme': 'smoothness'
  },
  'ember-cli-bootstrap-sass': {
    'importBootstrapJS': true
  },
  vendorFiles: {
    'handlebars.js': {
      production:  'bower_components/handlebars/handlebars.js'
    }
  }
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import('bower_components/pouchdb/dist/pouchdb.js');
app.import('bower_components/relational-pouch/dist/pouchdb.relational-pouch.js');
app.import('bower_components/ember-pouch/dist/globals/main.js');
app.import('bower_components/blueimp-md5/js/md5.js');
app.import('vendor/js/jquery-knob/jquery.knob.js');

module.exports = app.toTree();
