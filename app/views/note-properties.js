import Ember from 'ember';

export default Ember.View.extend({
  elementInserted: false,
  didInsertElement: function() {
    this.$( "#velocity-slider" ).slider({max: 127, disabled: true});
    this.elementInserted = true;
  },
  velocityChanged: function() {
    if (this.elementInserted) {
      var velocity = this.get('controller.velocity');
      this.$("#velocity-slider").slider('value', velocity);
    }
  }.observes('controller.velocity')
});
