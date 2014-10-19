import Ember from 'ember';

export default Ember.ArrayController.extend({
  numTracks: function() {
    return this.model + '';
  }.property('numTracks')
});
