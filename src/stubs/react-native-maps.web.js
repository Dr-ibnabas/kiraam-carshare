// Stub vide pour react-native-maps sur le Web
// (react-native-maps n'a pas de support web)
const React = require('react');

const View = require('react-native').View;

function Stub(props) {
  return React.createElement(View, props, props.children);
}

module.exports = Stub;
module.exports.default = Stub;
module.exports.Marker = Stub;
module.exports.Callout = Stub;
module.exports.Polyline = Stub;
module.exports.Polygon = Stub;
module.exports.Circle = Stub;
module.exports.PROVIDER_DEFAULT = undefined;
module.exports.PROVIDER_GOOGLE = undefined;
