import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api',
  buildURL: function(type, id, record) {
    return this._super(type, id, record) + '.json';
  }
});
