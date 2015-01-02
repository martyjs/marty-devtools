var expect = require('chai').expect;
var ActionsColumn = require('../pageObjects/actionsColumnPageObject');

describe('ActionsColumn', function () {
  var column, actions;

  beforeEach(function () {
    actions = [{
      id: 1,
      type: 'FOO'
    }, {
      id: 2,
      type: 'BAR'
    }];

    column = new ActionsColumn({
      actions: actions
    });
  });

  it('should show all actions', function () {
    expect(column.list.items.length).to.eql(actions.length);
  });

  it('should show the action type', function () {
    var actualTypes = column.list.items.map(function (item) {
      return item.type.value;
    });

    var expectedTypes = actions.map(function (action) {
      return action.type;
    });

    expect(actualTypes).to.eql(expectedTypes);
  });
});