import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    window.store = this.store;
    window.route = this;
  }
});
