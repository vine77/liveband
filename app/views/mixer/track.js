import Ember from 'ember';

export default Ember.View.extend({
  volumeLocked: false,
  //TODO: This should be done using {{ember-knob }}
  // helper in template...
  didInsertElement: function() {

    this.$('.mixer-knob')
    .attr('data-min', '-100')
    .attr('data-max', '100')
    .attr('data-angleOffset', '-180')
    .attr('data-width', '75')
    .attr('data-cursor', true)
    .attr('data-fgColor', '#333')
    .attr('data-bgColor', '#aaa')
    .attr('data-displayInput', false)
    .knob();

    var volume = this.get('controller.model.volume');
    var _this = this;
    this.$('.volume-slider').slider({
      orientation: 'vertical',
      range: 'min',
      min: 0,
      max: 120,
      value: volume,
      stop: function(event, ui) {
        var volumeLocked = _this.get('volumeLocked');
        if (!volumeLocked) {
          _this.set('volumeLocked', true);
          _this.get('controller').send('setVolume', ui.value);
          _this.set('volumeLocked', false);
        }
      }
    });
  }
});
