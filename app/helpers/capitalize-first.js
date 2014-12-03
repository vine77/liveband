import Ember from 'ember';

export function capitalizeFirst(input) {
  if (input && typeof input === 'string') {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
}

export default Ember.Handlebars.makeBoundHelper(capitalizeFirst);
