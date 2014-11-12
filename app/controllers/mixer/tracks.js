import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    addTrack: function() {
      this.store.createRecord('track');
    }
  }
});
