/** @type {import('expo/metro-config').DefaultConfig} */
const { getDefaultConfig } = require("expo/metro-config");
const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.resolverMainFields.unshift("sbmodern");
defaultConfig.resolver.sourceExts.push("cjs");
defaultConfig.resolver.sourceExts.push("mjs");
defaultConfig.resolver.assetExts.push("css");
defaultConfig.transformer.assetPlugins.push("expo-asset/tools/hashAssetFiles");
module.exports = defaultConfig;
