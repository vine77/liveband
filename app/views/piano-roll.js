import Ember from 'ember';

export default Ember.View.extend({
  NUM_WHITE_KEYS: 21,
  NUM_BLACK_KEYS: 15,
  CREATE_OFFSET: 0, //updated in _updateOffset method

  currentNoteEditing: null,
  doNotDraw: false,
  mouseIsDown: false,
  selectedNote: null,
  nextNoteId: 0,
  numCols: 0,
  // each grid line represents a quarter note
  // assume four beats per measure
  // (4/4)
  numBeatsPerMeasure: 4,

  didInsertElement: function() {
    this._build();
  },

  modelChanged: function() {
    var _this = this;
    var controller = this.get('controller');
    controller.store.find('note').then(function(data){
      var notes = data.get('content');
      notes.forEach(function(note){
        _this._addNote(note);
      });
    });

  }.observes('controller.model'),

  _updateModel: function(note) {
    var m = this._noteElementToModel(note);
    this.get('controller').updateNote(m);
  },

  _noteElementToModel: function(note) {
    var left = parseInt(note.css('left'));
    var right = left + parseInt(note.css('width'));
    var start = this._getTimeFromXPos(left);
    var end = this._getTimeFromXPos(right);
    var id = parseInt(note.attr('id').substr(5));
    var velocityBar = this.$('#velocity-' + id);
    var velocity = parseInt(velocityBar.css('height'));
    var tone = note.parent().attr('id').substr(14);

    var m = {
      id: id,
      startMeasure: start.measure,
      startQuarter: start.quarter,
      startEighth: start.eighth,
      startOffset: start.offset,
      endMeasure: end.measure,
      endQuarter: end.quarter,
      endEighth: end.eighth,
      endOffset: end.offset,
      velocity: velocity,
      tone: tone
    };
    return m;
  },

  _addNote: function(note) {
    var gridRow = this._getGridRowFromTone(note.get('tone'));
    var startX = this._getXPosFromTime(note, 'start');
    var endX = this._getXPosFromTime(note, 'end');
    var width = endX - startX;
    var noteEl = this._createNote(gridRow, startX, width);
    var id = parseInt(note.get('id'));
    this.$(noteEl).attr('id', 'note-' + id);
    this._addVelocityMarker(noteEl, id, note.get('velocity'));
    if (id >= this.nextNoteId) {
      this.nextNoteId = id + 1;
    }
  },

  _getGridRowFromTone: function(tone) {
    return this.$('#grid-drag-row-' + tone);
  },

  _getXPosFromTime: function(note, startOrEnd) {
    //TODO: This should be based on whether 3/4, 4/4, whatever
    //      For now, assume 4/4

    var measure = note.get(startOrEnd + 'Measure');
    var quarterNote = note.get(startOrEnd + 'Quarter');
    var qNoteOffset = note.get(startOrEnd + 'Offset');

    var gridColWidth = parseInt(this.$('.grid-col').css('width'));

    var xOffset = parseInt(measure) * gridColWidth * this.numBeatsPerMeasure;
    xOffset += parseInt(quarterNote) * gridColWidth;

    //quarter note offset goes from 0 to 99
    xOffset += Math.round((gridColWidth / 100) * parseInt(qNoteOffset));

    return xOffset;
  },

  _getTimeFromXPos: function(xPos) {
    var gridColWidth = parseInt(this.$('.grid-col').css('width'));
    var measure = parseInt((xPos / gridColWidth) / this.numBeatsPerMeasure);
    var measureRemainder = xPos - measure * gridColWidth * this.numBeatsPerMeasure;
    var quarterNote = parseInt(measureRemainder / gridColWidth);
    var quarterNoteRemainder = measureRemainder - quarterNote * gridColWidth;
    var eighthNote = parseInt((quarterNoteRemainder / gridColWidth) * this.numBeatsPerMeasure);
    var eighthNoteRemainder =  quarterNoteRemainder - (gridColWidth / this.numBeatsPerMeasure) * eighthNote;
    var offset = eighthNoteRemainder;
    return {
      measure: measure,
      quarter: quarterNote,
      eighth: eighthNote,
      offset: offset
    };
  },

  _createNote: function(gridRow, xPos, width) {
    width = width || null;
    var _this = this;
    var note = this.$('<div class="midi-note"></div>')
    .css('left', xPos + 'px')
    .appendTo(gridRow)
    .mousedown(function() {
      _this.currentNoteEditing = null;
      _this.doNotDraw = true;
      _this._setSelectedNote(_this.$(this));
    })
    .draggable({
      snap: ".snap",
      stop: function() {
        var id = _this.$(this).attr('id').substr(5);
        _this.$('#velocity-' + id).css('left', _this.$(this).css('left'));

        //http://stackoverflow.com/questions/5177867/how-to-find-out-about-the-snapped-to-element-for-jquery-ui-draggable-elements
        /* Get the possible snap targets: */
        var snapped = _this.$(this).data('ui-draggable').snapElements;

        /* Pull out only the snap targets that are "snapping": */
        var snappedTo = [];
        for(var i = 0; i < snapped.length; i++) {
          var element = snapped[i];
          if(element.snapping && _this.$(element.item).hasClass('grid-drag-row')) {
            snappedTo.push(element.item);
          }
        }

        //always the 2nd row element, for some reason...
        var newGridRow = snappedTo.length === 3 ? snappedTo[0] : snappedTo[1];
        _this.$(newGridRow).append(_this.$(this));
        _this.$(this).css('top', '0');
        _this._updateModel(_this.$(this));
      }
    })
    .resizable({
      handles: "e, w",
      stop: function() {
        var id = _this.$(this).attr('id').substr(5);
        _this.$('#velocity-' + id).css('left', _this.$(this).css('left'));
        _this._updateModel(_this.$(this));
      }
    });
    if (width) {
      note.css('width', width + 'px');
    }

    return note;
  },

  _setSelectedNote: function(el) {
    if (this.$(this.selectedNote).attr('id') === this.$(el).attr('id')) {
      return;
    }

    if(this.selectedNote) {
      this._unselectNote(this.selectedNote);
    }
    if (el) {
      this._selectNote(el);
    }
  },

  _selectNote: function(el) {
    var id = el.attr('id').substr(5);
    el.addClass('selected');
    this.$('#velocity-' + id).addClass('selected');
    this._autoAdjustScroll(el);

    this.selectedNote = el;
    this.get('controller').setSelected(parseInt(id));
  },

  _autoAdjustScroll: function(el) {
    //TODO: *magic numbers -- noooooo*
    var top = el[0].getBoundingClientRect().top;
    var sc;
    if (top <= 96) {
      sc = this.$("#keys-and-grid")[0].scrollTop + top - 114;
      this.$("#keys-and-grid").animate({scrollTop: sc + 'px'});
    }
    else if (top >= 390) {
      sc = this.$("#keys-and-grid")[0].scrollTop + top - 204;
      this.$("#keys-and-grid").animate({scrollTop: sc + 'px'});
    }
  },

  _unselectNote: function(el) {
    var id = el.attr('id').substr(5);
    this.$(el).find('input').blur();
    el.removeClass('selected');
    this.$('#velocity-' + id).removeClass('selected');
    this.selectedNote = null;
    this.get('controller').unselect(parseInt(id));
  },

  _addVelocityMarker: function(note, id, velocity) {
    var _this = this;
    velocity = velocity || 63;
    var noteLeftPos = note.css('left');
    var velocityBar = this.$('<div id="velocity-' + id + '"class="velocity-bar"></div>')
    .appendTo('#velocity')
    .resizable({ handles: "n", maxHeight: 127 })
    .bind("resize", function () {
      _this.$(this).css("top", "auto");
      var id = _this.$(this).attr('id').substr(9);
      var note = _this.$('#note-' + id);
      _this._updateModel(note);
    })
    .mousedown(function() {
      var id = _this.$(this).attr('id').substr(9);
      var selectNote =_this.$('#note-' + id);
      _this._setSelectedNote(selectNote);
    });
    velocityBar.css('left', noteLeftPos);
    velocityBar.css('height', velocity + 'px');
  },

  _deleteSelectedNote: function() {
    if (this.selectedNote) {
      //TODO
      //this.get('controller').deleteSelected();
      this.$('#velocity-' + this.$(this.selectedNote).attr('id').substr(5)).remove();
      this.$(this.selectedNote).remove();
    }
  },

  _build: function() {
    this._updateOffset();
    this._makeKeys();
    this._makeGrid();
    this._makeVelocityRows();
    this._syncScroll();
    this._listenForDelete();
  },

  _listenForDelete: function() {
    var _this = this;
    this.$(document).keydown(function(evt) {
      if (evt.keyCode === 68 /*D*/ && evt.shiftKey && _this.selectedNote) {
        _this._deleteSelectedNote();
      }
    });
  },

  _makeKeys: function() {
    this._makeWhiteKeys();
    this._makeBlackKeys();
  },

  _makeGrid: function() {
    var _this = this;
    var tones = ['b', 'aS', 'a', 'gS', 'g', 'fS', 'f', 'e', 'dS', 'd', 'cS', 'c'];
    var octaves = [5, 4, 3, 2, 1];
    var i;

    for (i = 0; i < this.NUM_WHITE_KEYS + this.NUM_BLACK_KEYS ; i++) {
      var alt = i % 2 === 0 ? ' alt' : '';
      var keyTone = tones[i % tones.length];
      var octave = octaves[parseInt(i / tones.length)];
      var label = keyTone + octave;

      this.$('<div class="grid-row' + alt + '"></div>').appendTo('#grid-rows');
      this.$('<div id="grid-drag-row-' + label + '" class="grid-drag-row snap"></div>').appendTo('#grid-drag-rows');
    }

    for (i = 0; i < 36; i++) {
      this._addColumn();
    }
    this.$('.grid-drag-row').mousedown(function(evt) {
      if (_this.doNotDraw === false) {
        _this.mouseIsDown = true;
        var xPos = evt.clientX - _this.CREATE_OFFSET + _this.$('#keys-and-grid').scrollLeft();
        _this.currentNoteEditing = _this._createNote(_this.$(this), xPos);
      }
    });

    this.$('.grid-drag-row').mousemove(function(evt){
      if (!_this.mouseIsDown || _this.currentNoteEditing == null) {
        return;
      }

      var noteLeftPos = parseFloat(_this.currentNoteEditing.css('left'));
      var xPos = evt.clientX - _this.CREATE_OFFSET + _this.$('#keys-and-grid').scrollLeft();
      var newWidth = xPos - noteLeftPos;
      _this.currentNoteEditing.css('width', newWidth + 'px');
    });

    this.$('#grid').mouseup(function(){
      if (_this.currentNoteEditing != null) {
        var noteWidth = parseFloat(_this.currentNoteEditing.css('width'));
        if (noteWidth <= 2) {
          _this.currentNoteEditing.remove();
          _this._setSelectedNote(null);
        }
        else {
          var id = _this.nextNoteId++;
          _this.currentNoteEditing.attr('id', 'note-' + id);
          _this._addVelocityMarker(_this.currentNoteEditing, id);
          _this._updateModel(_this.currentNoteEditing);
          _this._setSelectedNote(_this.currentNoteEditing);
        }
        _this.currentNoteEditing = null;
      }
      _this.doNotDraw = false;
      _this.mouseIsDown = false;
    });
  },

  _makeWhiteKeys: function() {
    var tones = ['b', 'a', 'g', 'f', 'e', 'd', 'c'];
    var octaves = [5, 4, 3, 2, 1];

    for(var i = 0; i < this.NUM_WHITE_KEYS; i++) {
      var keyTone = tones[i % tones.length];
      var octave = octaves[parseInt(i / tones.length)];
      var label = keyTone + octave;

      this.$('<div class="white-key" id="key-' + label + '"></div>').appendTo('#white-keys');
    }

    this.$('.white-key').click(function(){
      //play note?
    });
  },

  _makeBlackKeys: function() {
    var tones = ['aS', 'gS', 'fS', 'dS', 'cS'];
    var offsets = ['double', 'single', 'single', 'double', 'single'];

    var octaves = [5, 4, 3, 2, 1];
    for(var i = 0; i < this.NUM_BLACK_KEYS; i++) {
      var keyTone = tones[i % tones.length];
      var octave = octaves[parseInt(i / tones.length)];
      var label = keyTone + octave;
      var cl = i === 0 ? 'single' : offsets[i % tones.length];
      this.$( '<div id="key-' + label + '" class="black-key ' + cl + '"></div>').appendTo('#black-keys');
    }

    this.$('.black-key').click(function(){
      //play note?
    });
  },

  _makeVelocityRows: function() {
    for (var i = 0; i < 5 ; i++) {
      this.$('<div class="grid-row"></div>').appendTo('#velocity');
    }
  },

  _addColumns: function(numColumns) {
    var i;
    if (numColumns > 0) {
      for(i = 0; i < numColumns; i++) {
        this._addColumn();
      }
    }
    else {
      numColumns = Math.abs(numColumns);
      for(i = 0; i < numColumns; i++) {
        this._removeColumn();
      }
    }
  },

  _addColumn: function() {
    var id = this.numCols++;
    this.$('<div class="grid-col snap"></div>')
    .appendTo('#grid-cols')
    .attr('id', 'grid-col-' + id);
  },

  _removeColumn: function() {
    var cols = this.$('.grid-col');
    if (cols.length > 0) {
      cols[cols.length - 1].remove();
      this.numCols--;
    }
  },

  _syncScroll: function() {
    var _this = this;
    var foreignScroll = false;

    function syncScroll(el) {
      if(foreignScroll) {
        foreignScroll = false;
        return;
      }
      var scrollLeft = el.scrollLeft;
      var originalWidth = parseInt(_this.$('#grid').css('width'));

      var colWidth = parseInt(_this.$('.grid-col').css('width'));
      var numExistingCols = _this.$('.grid-col').length;
      var numNeededCols = Math.ceil((originalWidth + scrollLeft) / colWidth);
      _this._addColumns(numNeededCols - numExistingCols);

      _this.$('#keys').css('left', scrollLeft);
      _this.$('#blank-velocity').css('left', scrollLeft);
      _this.$(".grid-row").css('width', originalWidth + scrollLeft);
      _this.$(".grid-drag-row").css('width', originalWidth + scrollLeft);

      if (_this.$(el).attr('id') === 'keys-and-grid') {
        foreignScroll = true;
        _this.$('#velocity-parent').scrollLeft(scrollLeft);
      }
      else if (_this.$(el).attr('id') === 'velocity-parent') {
        foreignScroll = true;
        _this.$('#keys-and-grid').scrollLeft(scrollLeft);
      }
    }

    this.$("#keys-and-grid").scroll(function() {
      syncScroll(this);
    });

    this.$('#velocity-parent').scroll(function() {
      syncScroll(this);
    });
  },

  _updateOffset: function() {
    this.CREATE_OFFSET =
      parseInt(this.$('#keys').css('width')) + 2 /*border-left on piano keys*/;
  }
});
