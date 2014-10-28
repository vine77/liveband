import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['daw'],
  model: Ember.computed.alias('controllers.daw.model'),
  tracks: Ember.computed.filterBy('model', 'type', 'audio'),
  actions: {
    addTrack: function() {
      return this.store.createRecord('track');
    }
  }
});
