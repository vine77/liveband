import Ember from 'ember';

//TODO: This may need to be done in application router instead...
//      See mixer prototype
export default Ember.Route.extend({
  model: function() {
    return this.store.find('track');
  }
});
