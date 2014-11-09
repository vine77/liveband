import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    //this.$( "#velocity-slider" ).slider({max: 127, disabled: true});
  },
  velocityChanged: function() {
    var velocity = this.get('controller.model.velocity');
    //this.$("#velocity-slider").slider('value', velocity);
    console.log('velocity changed');
  }.observes('controller.model.velocity')
});
