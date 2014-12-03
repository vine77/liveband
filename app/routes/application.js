import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    // Helper globals
    window.store = this.store;
    window.route = this;
    window.clear = function() {
      window.indexedDB.deleteDatabase('_pouch_liveband');
    };
  },
  setupController: function(controller, model) {
    this.controllerFor('mixer').set('model', this.store.find('track'));
    this.controllerFor('arrangement').set('model', this.store.find('track'));
  }
});
