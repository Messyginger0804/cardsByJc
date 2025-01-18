module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }], // Nativewind for Tailwind-like styling
        "nativewind/babel", // Enables Nativewind's Babel transformation
      ],
      plugins: [
        "react-native-reanimated/plugin", // Must be the last plugin for Reanimated
      ],
    };
  };
  