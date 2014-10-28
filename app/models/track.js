import DS from 'ember-data';

var Track = DS.Model.extend({
  name: DS.attr('string', {
    defaultValue: 'New track'
  }),
  type: DS.attr('string', {
    defaultValue: 'audio'
  }),
  master: DS.attr('boolean', {
    defaultValue: false
  }),
  input: DS.attr('object', {
    defaultValue: {id: '', label: 'Input'}
  }),
  output: DS.attr('object', {
    defaultValue: {id: 'std', label: 'Std'}
  }),
  volume: DS.attr('number', {
    defaultValue: 0
  }),
  effects: DS.attr('array'),
  leftRightBalance: DS.attr('number', {
    defaultValue: 0
  }),
  solo: DS.attr('boolean', {
    defaultValue: false
  }),
  mute: DS.attr('boolean', {
    defaultValue: false
  })
});

export default Track;
