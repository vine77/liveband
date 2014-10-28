import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    mute: function() {
      this.set('mute', this.get('mute') ? false : true);
      this.set('solo', false);
    },
    solo: function() {
      this.set('solo', this.get('solo') ? false : true);
      this.set('mute', false);
    },
    edit: function() {
      this.set('isEditing', true);
    },
    saveName: function() {
      this.set('isEditing', false);
    }
  }
});
