import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['note-properties'],
  updateNote: function(note) {
    this.store.push('note', note);
    if (note) {
      var notePropertiesController = this.get('controllers.note-properties');
      notePropertiesController.send('setNote', note);
    }
  },
  setSelected: function(noteId) {
    var _this = this;
    this.store.find('note', noteId).then(function(data){
      var notePropertiesController = _this.get('controllers.note-properties');
      notePropertiesController.send('setNote', data);
    });
  },
  unselect: function() {
    var notePropertiesController = this.get('controllers.note-properties');
    notePropertiesController.send('setNote', null);
  },
  deleteSelected: function() {
    this.get('controllers.note-properties').deleteSelected();
    this.unselect();
  }
});
