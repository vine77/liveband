import DS from 'ember-data';

var Track = DS.Model.extend({
  name: DS.attr('string'),
  type: DS.attr('string'),
  input: DS.attr('object'),
  output: DS.attr('object'),
  volume: DS.attr('number'),
  effects: DS.attr('array'),
  leftRightBalance: DS.attr('number'),
  solo: DS.attr('boolean'),
  mute: DS.attr('boolean')
});

Track.reopenClass({
  FIXTURES: [
    {
      id: 1,
      type: 'audio',
      name: 'Kick',
      input: {id: "", label: "Input"},
      output: {id: "std", label: "Std"},
      volume: 50,
      effects: [{label: 'Comp'}],
      leftRightBalance: 30,
      solo: false,
      mute: false
    },
    {
      id: 2,
      type: 'audio',
      name: 'Snare',
      input: {id: "johnb_id", label: "JohnB"},
      output: {id: "bus1", label: "Bus 1"},
      volume: 50,
      effects: [],
      leftRightBalance: 20,
      solo: false,
      mute: false
    },
    {
      id: 3,
      type: 'effects',
      name: 'Reverb FX',
      input: {id: "bus1", label: "Bus 1"},
      output: {id: "std", label: "Std"},
      volume: 50,
      effects: [{label: 'Reverb'}],
      leftRightBalance: 10,
      solo: false,
      mute: false
    }
  ]
});

export default Track;
