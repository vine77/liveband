import Ember from 'ember';

export default Ember.ArrayController.extend({
  itemController: 'mixer/track',
  hasSoloedTrack: function() {
    return this.get('model').isAny('solo', true);
  }.property('model.@each.solo'),
  actions: {
    addTrack: function() {
      this.store.createRecord('track');
    }
  }
});
