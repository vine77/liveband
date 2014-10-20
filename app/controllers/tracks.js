import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    addTrack: function() {
      //TODO: Perhaps show dialog then create record?
      this.store.createRecord('track', {
        type: 'audio',
        master: false,
        name: 'New track',
        input: {id: "", label: "Input"},
        output: {id: "std", label: "Std"},
        volume: 0,
        effects: [],
        leftRightBalance: 0,
        solo: false,
        mute: false
      });
    }
  }
});
