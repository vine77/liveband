import DS from 'ember-data';
import Ember from 'ember';

export default DS.Transform.extend({
  deserialize: function(value) {
		if (!Ember.$.isPlainObject(value)) {
			return {};
		} else {
			return value;
		}
	},
	serialize: function(value) {
		if (!Ember.$.isPlainObject(value)) {
			return {};
		} else {
			return value;
		}
	}
});
