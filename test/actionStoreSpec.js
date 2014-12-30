var sinon = require('sinon');
var expect = require('chai').expect;
var ActionPayload = require('marty/actionPayload');
var ActionStore = require('../app/stores/actionStore');

describe('ActionStore', function () {
  var listener, expectedId, expectedAction, actualAction;

  beforeEach(function () {
    expectedId = '1';
    listener = sinon.spy();
    ActionStore.addChangeListener(listener);
  });

  describe('upsertAction', function () {
    describe('when a new action is dispatched', function () {
      beforeEach(function () {
        expectedAction = {
          id: expectedId,
          type: 'TEST',
          status: 'PENDING'
        };

        upsertAction(expectedAction)

        actualAction = ActionStore.getActionById(expectedId);
      });

      it('should add the action', function () {
        expect(actualAction).to.eql(expectedAction);
      });

      it('should notify any listeners', function () {
        expect(listener).to.have.been.calledOnce;
      });
    });

    describe('when the action is done', function () {
      it('should change the status of the action to done');
    });

    describe('when the action fails', function () {
      it('should change the status of the action to failed');
    });

    function upsertAction(action) {
      dispatch({
        type: 'UPSERT_ACTION',
        arguments: [action]
      });
    }
  });

  function dispatch(payload) {
    ActionStore.handleAction(new ActionPayload(payload));
  }

  afterEach(function () {
    ActionStore.dispose();
  });
});