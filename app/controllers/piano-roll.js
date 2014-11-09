import Ember from 'ember';

export default Ember.Controller.extend({
  updateNote: function(note) {
    this.store.push('note', note);
  },
  setSelected: function(noteId) {
    var note = this.store.find('note', noteId);
    console.log('note', note);
    var notePropertiesController = this.get('controllers.note-properties');
    notePropertiesController.set('model', note);
  },
  unselect: function() {
    var notePropertiesController = this.get('controllers.note-properties');
    notePropertiesController.set('model', null);
  },
  deleteSelected: function() {
    this.get('controllers.note-properties').deleteSelected();
    this.unselect();
  },

  needs: 'note-properties'
});
