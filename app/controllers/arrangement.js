import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['daw'],
  itemController: 'mixer/track',
  actions: {
    addTrack: function() {
      return this.store.createRecord('track').save();
    }
  }
});
