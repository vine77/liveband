import Ember from 'ember';

export default Ember.Controller.extend({
  tone: '',
  startMeasure: '',
  startQuarter: '',
  startOffset: '',
  endMeasure: '',
  endQuarter: '',
  endOffset: '',
  velocity: '',
  actions: {
    setNote: function(note) {
      if (note) {
        if (note.get) {
          this.set('tone', note.get('tone').toUpperCase().replace('S', '#'));
          this.set('startMeasure', note.get('startMeasure'));
          this.set('startQuarter', note.get('startQuarter'));
          this.set('startOffset', note.get('startOffset'));
          this.set('endMeasure', note.get('endMeasure'));
          this.set('endQuarter', note.get('endQuarter'));
          this.set('endOffset', note.get('endOffset'));
          this.set('velocity', note.get('velocity'));
        }
        else {
          this.set('tone', note.tone.toUpperCase().replace('S', '#'));
          this.set('startMeasure', note.startMeasure);
          this.set('startQuarter', note.startQuarter);
          this.set('startOffset', note.startOffset);
          this.set('endMeasure', note.endMeasure);
          this.set('endQuarter', note.endQuarter);
          this.set('endOffset', note.endOffset);
          this.set('velocity', note.velocity);
        }
      }
      else {
        this.set('tone', '');
        this.set('startMeasure', '');
        this.set('startQuarter', '');
        this.set('startOffset', '');
        this.set('endMeasure', '');
        this.set('endQuarter', '');
        this.set('endOffset', '');
      }
    }
  }
});
