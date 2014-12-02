import DS from 'ember-data';

export default DS.Model.extend({
  rev: DS.attr('string'),
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
