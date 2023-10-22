module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@atoms": "./src/components/atoms",
            "@components": "./src/components",
            "@src": "./src",
          },
        },
      ],
      "expo-router/babel",
      
      // For reanimated in web, we should use @babel/plugin-proposal-export-namespace-from
      '@babel/plugin-proposal-export-namespace-from',
      
      // according to expo docs, Reanimated plugin has to be the last item in the plugins array.
      // https://docs.expo.dev/versions/latest/sdk/reanimated/
      "react-native-reanimated/plugin",
    ],
  };
};
