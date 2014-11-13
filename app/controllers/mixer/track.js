import Ember from 'ember';

export default Ember.ObjectController.extend({
  volumeLeftHeight: function() {
    return 'height: 20%';
  }.property('volumeLeftHeight'),
  volumeRightHeight: function() {
    return 'height: 20%';
  }.property('volumeRightHeight'),
  actions: {
    mute: function() {
      this.set('mute', this.get('mute') ? false : true);
      this.set('solo', false);
      this.get('model').save();
    },
    solo: function() {
      this.set('solo', this.get('solo') ? false : true);
      this.set('mute', false);
      this.get('model').save();
    },
    edit: function() {
      this.set('isEditing', true);
    },
    saveName: function() {
      this.set('isEditing', false);
      this.get('model').save();
    },
    setVolume: function(volume) {
      this.set('volume', volume);
      this.get('model').save();
    },
    delete: function() {
      var prompt = 'Are you sure you want to delete track "' + this.get('name') + '"?';
      if (window.confirm(prompt)) {
        this.get('model').deleteRecord();
        this.get('model');
      }
    }
  }
});
