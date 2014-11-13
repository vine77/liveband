import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:mixer/master-track', 'MixerMasterTrackController', {
  // Specify the other units that are required for this test.
  needs: ['controller:master']
});

// Replace this with your real tests.
test('it exists', function() {
  var controller = this.subject();
  ok(controller);
});
