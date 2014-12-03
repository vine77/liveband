import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  rev: DS.attr('string'),
  version: function() {
    if (Ember.isEmpty(this.get('rev'))) return 0;
    return parseInt(this.get('rev').split('-')[0]);
  }.property('rev'),
  name: DS.attr('string', {
    defaultValue: 'New Project'
  }),
  isPublic: DS.attr('boolean', {
    defaultValue: false
  }),
  shared: function() {
    if (this.get('isPublic')) {
      return 'public';
    } else if (this.get('collaborators.length') > 0) {
      return 'shared';
    } else {
      return 'private';
    }
  }.property('isPublic', 'collaborators.@each'),
  collaborators: DS.hasMany('user')
});
