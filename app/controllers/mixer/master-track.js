import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['master'],
  masterVolume: Ember.computed.alias('controllers.master.volume'),
  maxVolume: 120,
  masterVolumeLeft: function() {
    return 90 * (this.get('masterVolume') / 100);
  }.property('masterVolume'),
  masterVolumeRight: function() {
    return 100 * (this.get('masterVolume') / 100);
  }.property('masterVolume'),
  masterVolumeLeftWidth: function() {
    return 'width:' + this.get('masterVolumeLeft') + '%';
  }.property('masterVolumeLeft'),
  masterVolumeRightWidth: function() {
    return 'width:' + this.get('masterVolumeRight') + '%';
  }.property('masterVolumeRight'),
  masterVolumeLeftHeightInverted: function() {
    var h = Math.max(0, (100 - this.get('masterVolumeLeft')));
    return 'height:' + h + '%';
  }.property('masterVolumeLeft'),
  masterVolumeRightHeightInverted: function() {
    var h = Math.max(0, (100 - this.get('masterVolumeRight')));
    return 'height:' + h + '%';
  }.property('masterVolumeLeft')
});
