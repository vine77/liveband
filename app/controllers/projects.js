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
    },
    addCollaborator: function(project) {
      var email = window.prompt('What is the email address of the collaborator you would like to add?');
      if (Ember.isEmpty(email)) return;
      var user = this.store.all('user').findBy('email', email);
      if (user !== undefined) {
        project.get('collaborators').addObject(user);
        project.save();
      } else {
        user = this.store.createRecord('user', {
          email: email
        });
        this.store.find('gravatar', {
          email: email
        }).then(function(gravatars) {
          var gravatar = gravatars.get('firstObject');
          user.set('gravatar', gravatar);
          user.save();
        });
        user.save().then(function(user) {
          project.get('collaborators').addObject(user);
          project.save();
        });
      }
    },
    deleteCollaborator: function(user, project) {
      var prompt = 'Are you sure you want to remove user "' + user.get('displayName') + '" from project "' + project.get('name') + '"?';
      if (window.confirm(prompt)) {
        project.get('collaborators').removeObject(user);
        user.deleteRecord();
        user.save();
        project.save();
      }
    }
  }
});
