import Ember from 'ember';

export default Ember.ObjectController.extend({
  volumeLeft: function() {
    return 90 * (this.get('volume') / 100);
  }.property('model.volume'),
  volumeRight: function() {
    return 100 * (this.get('volume') / 100);
  }.property('model.volume'),
  volumeLeftHeightInverted: function() {
    return 'height:'+ (100 - this.get('volumeLeft')) +'%';
  }.property('volumeLeft'),
  volumeRightHeightInverted: function() {
    return 'height:'+ (100 - this.get('volumeRight')) +'%';
  }.property('volumeRight'),
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
    duplicate: function() {
      this.store.createRecord('track', this.get('model').toJSON()).save();
    },
    delete: function() {
      var prompt = 'Are you sure you want to delete track "' + this.get('name') + '"?';
      if (window.confirm(prompt)) {
        this.get('model').deleteRecord();
        this.get('model').save();
      }
    },
    rename: function() {
      var prompt = 'Rename track to:';
      var newName = window.prompt(prompt);
      if (!Ember.isEmpty(newName)) {
        this.set('name', newName);
      }
    }
  }
});
