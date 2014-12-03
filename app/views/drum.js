import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    var value;
    var _this = this;
    this.$('ul.dr li div').each(function(idx, el){
      value = _this.$(el).attr('value');
      _this.$(el).slider({
        orientation: 'horizontal',
        value: value,
        min: 0,
        max: 10
      });
    });
  }
});
