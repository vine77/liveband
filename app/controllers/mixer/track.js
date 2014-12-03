import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['mixer'],
  volumeLeft: function() {
    return 90 * (this.get('volume') / 100);
  }.property('model.volume'),
  volumeRight: function() {
    return 100 * (this.get('volume') / 100);
  }.property('model.volume'),
  volumeLeftHeightInverted: function() {
    var h = Math.max(0, (100 - this.get('volumeLeft')));
    return 'height:'+ h +'%';
  }.property('volumeLeft'),
  volumeRightHeightInverted: function() {
    var h = Math.max(0, (100 - this.get('volumeRight')));
    return 'height:'+ h +'%';
  }.property('volumeRight'),
  isSoloMuted: function() {
    return this.get('controllers.mixer.hasSoloedTrack') && !this.get('solo') && !this.get('mute');
  }.property('mute', 'controllers.mixer.hasSoloedTrack'),
  isMuted: Ember.computed.or('mute', 'isSoloMuted'),
  hasOwner: Ember.computed.notEmpty('owner'),
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
    },
    assignOwner: function(owner) {
      var track = this.get('model');
      var prompt = 'Are you sure you want to assign user "' + owner.get('displayName') + '" to track "' + track.get('name') + '"?';
      if (window.confirm(prompt)) {
        track.set('owner', owner);
        track.save();
      }
    }
  }
});
