import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    createProject: function() {
      this.store.createRecord('project').save();
    },
    deleteProject: function(project) {
      if (window.confirm('Are you sure you want to delete project "' + project.get('name') + '"?')) {
        project.deleteRecord();
        project.save();
      }
    },
    duplicateProject: function(project) {
      this.store.createRecord('project', project.toJSON()).save();
    },
    previewProject: function(project) {
      alert('Error: Preview not available at this time.');
    },
    toggleIsPublic: function(project) {
      var prompt = 'Are you sure you want to make project "' + project.get('name') + (project.get('isPublic') ? '" private?' : '" public?');
      if (prompt) {
        project.set('isPublic', !project.get('isPublic'));
      }
    },
    openProject: function(project) {
      this.transitionTo('daw');
    },
    editName: function(project) {
      var newName = window.prompt('New project title:');
      if (!Ember.isEmpty(newName)) {
        project.set('name', newName);
      }
    }
  }
});
