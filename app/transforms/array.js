import DS from 'ember-data';
import Em from 'ember';
import Ember from 'ember';

export default DS.Transform.extend({
  deserialize: function(value) {
		if (Ember.isArray(value)) {
			return Em.A(value);
		} else {
			return Em.A();
		}
	},
	serialize: function(value) {
		if (Ember.isArray(value)) {
			return Em.A(value);
		} else {
			return Em.A();
		}
	}
});
