const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.resolverMainFields.unshift("sbmodern");
defaultConfig.resolver.sourceExts.push("cjs");
defaultConfig.resolver.sourceExts.push("mjs");

module.exports = defaultConfig;
