import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    clear: function() {
      window.indexedDB.deleteDatabase('_pouch_liveband');
      window.location.reload();
    }
  }
});
