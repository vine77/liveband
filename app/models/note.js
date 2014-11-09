import DS from 'ember-data';

export default DS.Model.extend({
  tone: DS.attr('string'),
  startMeasure: DS.attr('number'),
  startQuarter: DS.attr('number'),
  startOffset: DS.attr('number'),
  endMeasure: DS.attr('number'),
  endQuarter: DS.attr('number'),
  endOffset: DS.attr('number'),
  velocity: DS.attr('number')
});
