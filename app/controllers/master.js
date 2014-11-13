import Ember from 'ember';

export default Ember.Controller.extend({
  volume: 100,
  isPlaying: false,
  isRecording: false,
  isLooping: false,
  isCountIn: false,
  isMetronome: true
});
