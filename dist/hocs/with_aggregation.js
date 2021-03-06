'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _get2 = require('lodash/fp/get');

var _get3 = _interopRequireDefault(_get2);

var _mantraCore = require('mantra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composer = function composer() {
  return function (props, onData) {
    var aggregationName = props.aggregationName,
        aggregations = props.aggregations;

    var aggregation = (0, _get3.default)(aggregationName)(aggregations);
    if (!aggregation) {
      onData(new Error('unkown aggregation:' + aggregationName));
    } else {
      var aggregate = aggregation.aggregate,
          aggregateComposer = aggregation.aggregateComposer,
          aggregationProps = (0, _objectWithoutProperties3.default)(aggregation, ['aggregate', 'aggregateComposer']);

      var allAggregationProps = (0, _extends3.default)({}, aggregationProps, {
        isAggregation: true
      });
      if (aggregateComposer) {
        aggregateComposer(props, function (e, p) {
          return onData(e, (0, _extends3.default)({}, allAggregationProps, p));
        });
      } else if (aggregate) {
        var docsAggregated = aggregate(props.docs, props);
        onData(null, (0, _extends3.default)({
          docs: docsAggregated
        }, allAggregationProps));
      } else {
        onData(new Error('specify either aggregate or aggregateComposer'));
      }
    }
  };
};

exports.composer = composer;

exports.default = function (type) {
  return (0, _mantraCore.composeWithTracker)(composer(type));
};
//# sourceMappingURL=with_aggregation.js.map