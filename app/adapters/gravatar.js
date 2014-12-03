import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'https://www.gravatar.com',
  pathForType: function(type) {
    return '';
  },
  buildURL: function(type, id, record) {
    return this._super(type, id, record).replace(/([^:])(\/\/+)/g, '$1/') + '.json';
  },
  findQuery: function(store, type, query) {
    if (Ember.isEmpty(query.email)) return this._super(store, type, query);
    var url = this.buildURL(type.typeKey);
    var urlSegments = [url.split('.json')[0]];
    urlSegments.push(window.md5(query.email));
    urlSegments.push('.json');
    urlSegments.pushObjects(url.split('.json').slice(1));
    return this.ajax(urlSegments.join(''), 'GET');
  },
  ajax: function(url, type, options) {
    var adapter = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var hash = adapter.ajaxOptions(url, type, options);
      hash.dataType = 'jsonp';  // Added this line to RESTAdapter's ajax function
      hash.success = function(json, textStatus, jqXHR) {
        json = adapter.ajaxSuccess(jqXHR, json);
        if (json instanceof DS.InvalidError) {
          Ember.run(null, reject, json);
        } else {
          Ember.run(null, resolve, json);
        }
      };
      hash.error = function(jqXHR, textStatus, errorThrown) {
        Ember.run(null, reject, adapter.ajaxError(jqXHR, jqXHR.responseText));
      };
      Ember.$.ajax(hash);
    }, "DS: RESTAdapter#ajax " + type + " to " + url);
  }
});
