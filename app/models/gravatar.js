import DS from 'ember-data';

export default DS.Model.extend({
  rev: DS.attr('string'),
  profileUrl: DS.attr('string'),
  preferredUsername: DS.attr('string'),
  displayName: DS.attr('string'),
  aboutMe: DS.attr('string'),
  email: DS.attr('string'),
  user: DS.belongsTo('user', {async: true})
});
