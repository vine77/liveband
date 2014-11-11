import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    this.$('.dial').attr('data-min', '0')
      .attr('data-max', '10')
      .attr('data-step', '1')
      .attr('data-angleOffset', '-125')
      .attr('data-angleArc', '250')
      .attr('data-width', '150')
      .attr('data-height', '150')
      .attr('data-fgColor', '#333')
      .attr('data-bgColor', '#aaa')
      .knob();
    this.$('#vol').click(function() {
      if (Ember.$('#vol').attr('class') === 'fa fa-volume-up fa-2x'){
        Ember.$('#vol').removeClass('fa fa-volume-up fa-2x').addClass('fa fa-volume-off fa-2x');
        Ember.$('.dial').val(0).trigger('change');
        Ember.$('#status').text('Enable');
      } else {
        Ember.$('#vol').removeClass('fa fa-volume-off fa-2x').addClass('fa fa-volume-up fa-2x');
        Ember.$('.dial').attr('data-max', '10');
        Ember.$('.dial').val(7).trigger('change');
        Ember.$('#status').text('Disable');
      }
    });
  }
});
