var sinon = require('sinon');
var _ = require('underscore');
var expect = require('chai').expect;
var uuid = require('../../lib/uuid').small;
var ActionPayload = require('marty/actionPayload');
var ActionStore = require('../../../app/background/stores/actionStore');
var inspect = _.partial(require('util').inspect, _, { depth: null, color: true }) // jshint ignore:line

describe('ActionStore', function () {
  var listener, tabId, expectedId, expectedAction, expectedActionType, actualAction;

  beforeEach(function () {
    tabId = 1;
    expectedId = '1';
    listener = sinon.spy();
    expectedActionType = 'TEST_ACTION';
  });

  describe('upsertAction', function () {
    describe('when an action is starting', function () {
      beforeEach(function () {
        ActionStore.addChangeListener(listener);
        expectedAction = _.extend(actionStarting(expectedActionType), {
          tabId: tabId,
          status: 'Pending'
        });
        actualAction = ActionStore.getActionById(expectedAction.id);
      });

      it('should add the action', function () {
        expect(actualAction).to.eql(expectedAction);
      });

      it('should notify any listeners', function () {
        expect(listener).to.have.been.calledOnce;
      });
    });

    describe('when an action is done', function () {
      var expectedError;

      beforeEach(function () {
        expectedAction = _.extend(actionStarting(expectedActionType), {
          tabId: tabId,
          status: 'Done'
        });
        ActionStore.addChangeListener(listener);
        actionDone(expectedAction.id);
        actualAction = ActionStore.getActionById(expectedAction.id);
      });

      it('should add the error to the action', function () {
        expect(actualAction).to.eql(expectedAction);
      });

      it('should notify any listeners', function () {
        expect(listener).to.have.been.calledOnce;
      });
    });

    describe('when an action has failed', function () {
      var expectedError;

      beforeEach(function () {
        expectedError = new Error('foo');
        expectedAction = _.extend(actionStarting(expectedActionType), {
          tabId: tabId,
          status: 'Failed',
          error: expectedError
        });
        ActionStore.addChangeListener(listener);
        actionFailed(expectedAction.id, expectedError);
        actualAction = ActionStore.getActionById(expectedAction.id);
      });

      it('should add the error to the action', function () {
        expect(actualAction).to.eql(expectedAction);
      });

      it('should notify any listeners', function () {
        expect(listener).to.have.been.calledOnce;
      });
    });

    function actionStarting(type) {
      return upsertAction('ACTION_STARTING', {
        id: uuid(),
        type: type,
        timestamp: new Date().toJSON()
      });
    }

    function actionDone(id) {
      return upsertAction('ACTION_DONE', {
        id: id
      });
    }

    function actionFailed(id, error) {
      return upsertAction('ACTION_FAILED', {
        id: id,
        error: error
      });
    }

    function upsertAction(actionType, action) {
      dispatch({
        type: 'PROCESS_DISPATCHED_ACTION',
        arguments: [tabId, {
          id: uuid(),
          type: actionType,
          arguments: [action]
        }]
      });

      return action;
    }
  });

  function dispatch(payload) {
    ActionStore.handleAction(new ActionPayload(payload));
  }

  afterEach(function () {
    ActionStore.dispose();
  });
});