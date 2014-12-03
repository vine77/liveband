/* globals md5 */
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  projects: DS.hasMany('project'),
  email: DS.attr('string'),
  gravatarUrl: function() {
    return 'http://www.gravatar.com/avatar/' + md5(this.get('email')) + '?s=50';
  }.property('email')
});
