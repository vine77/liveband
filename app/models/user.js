import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  rev: DS.attr('string'),
  name: Ember.computed.alias('gravatar.displayName'),
  email: DS.attr('string'),
  displayName: function() {
    return this.get('name') || this.get('email');
  }.property('name', 'email'),
  projects: DS.hasMany('project'),
  gravatarUrl: function() {
    return 'http://www.gravatar.com/avatar/' + window.md5(this.get('email')) + '?s=30';
  }.property('email'),
  gravatar: DS.belongsTo('gravatar', {async: true}),
  tracks: DS.hasMany('track')
});
