import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('mixer');
  this.route('daw');
  this.route('projects');
  this.route('signup');
});

export default Router;
