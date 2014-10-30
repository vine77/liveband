import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    $(".dial").attr('data-min', '0')
      .attr('data-max', '10')
      .attr('data-step', '1')
      .attr('data-angleOffset', '-125')
      .attr('data-angleArc', '250')
      .attr('data-width', '150')
      .attr('data-height', '150')
      .knob();
  }
});
