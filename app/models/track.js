import DS from 'ember-data';

var Track = DS.Model.extend({
  name: DS.attr('string'),
  type: DS.attr('string'),
  master: DS.attr('boolean'),
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
      id: 0,
      type: 'master',
      master: true,
      name: 'Master',
      input: {id: "", label: "Input"},
      output: {id: "std", label: "Std"},
      volume: 40,
      effects: [{label: 'Comp'}],
      leftRightBalance: 0,
      solo: false,
      mute: false
    },
    {
      id: 1,
      type: 'audio',
      master: false,
      name: 'Kick',
      input: {id: "", label: "Input"},
      output: {id: "std", label: "Std"},
      volume: 40,
      effects: [{label: 'Comp'}],
      leftRightBalance: 10,
      solo: true,
      mute: false
    },
    {
      id: 2,
      type: 'audio',
      master: false,
      name: 'Snare',
      input: {id: "johnb_id", label: "JohnB"},
      output: {id: "bus1", label: "Bus 1"},
      volume: 50,
      effects: [],
      leftRightBalance: 10,
      solo: false,
      mute: false
    },
    {
      id: 3,
      type: 'effects',
      master: false,
      name: 'Reverb FX',
      input: {id: "bus1", label: "Bus 1"},
      output: {id: "std", label: "Std"},
      volume: 30,
      effects: [{label: 'Reverb'}],
      leftRightBalance: 0,
      solo: false,
      mute: true
    }
  ]
});

export default Track;
