import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['master'],
  masterVolume: Ember.computed.alias('controllers.master.volume'),
  isPlaying: Ember.computed.alias('controllers.master.isPlaying'),
  isRecording: Ember.computed.alias('controllers.master.isRecording'),
  isLooping: Ember.computed.alias('controllers.master.isLooping'),
  isCountIn: Ember.computed.alias('controllers.master.isCountIn'),
  isMetronome: Ember.computed.alias('controllers.master.isMetronome'),
  maxVolume: 120,
  masterVolumeLeft: function() {
    return 90 * (this.get('masterVolume') / 100);
  }.property('masterVolume'),
  masterVolumeRight: function() {
    return 100 * (this.get('masterVolume') / 100);
  }.property('masterVolume'),
  masterVolumeLeftWidth: function() {
    return 'width:' + this.get('masterVolumeLeft') + '%';
  }.property('masterVolumeLeft'),
  masterVolumeRightWidth: function() {
    return 'width:' + this.get('masterVolumeRight') + '%';
  }.property('masterVolumeRight'),
  actions: {
    play: function() {
      this.set('isPlaying', !this.get('isPlaying'));
    },
    stop: function() {
      this.set('isPlaying', false);
      this.set('isRecording', false);
    },
    pause: function() {
      this.set('isPlaying', false);
      this.set('isRecording', false);
    },
    record: function() {
      this.set('isRecording', true);
      this.set('isPlaying', true);
    },
    toggleLooping: function() {
      this.set('isLooping', !this.get('isLooping'));
    },
    toggleCountIn: function() {
      this.set('isCountIn', !this.get('isCountIn'));
    },
    toggleMetronome: function() {
      this.set('isMetronome', !this.get('isMetronome'));
    }
  }
});
