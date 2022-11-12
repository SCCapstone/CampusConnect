module.exports = function (api) {
  api.cache(true);

  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = ['react-native-reanimated/plugin'];

  return {
    presets,
    plugins
  };
}

