const { override, addWebpackAlias, fixBabelImports, addLessLoader } = require('customize-cra')
const path = require('path')

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: override(
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    }),
    // Load antd
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    // Add `javascriptEnabled` and antd theme configuration
    // to the Less loader
    addLessLoader({
      lessOptions: {
        modules: true,
        javascriptEnabled: true,
        modifyVars: {
          // '@primary-color': '#1DA57A' 
        },
      }
    })
  ),
  // The Jest config to use when running your jest tests - note that the normal rewires do not
  // work here.
  jest: function (config) {
    // console.log(config)
    config.moduleNameMapper = {
      "^react-native$": "react-native-web",
      "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
      "^@/(.*)$": "<rootDir>/src/$1"
    };
    // ...add your jest config customisation...
    // Example: enable/disable some tests based on environment variables in the .env file.
    if (!config.testPathIgnorePatterns) {
      config.testPathIgnorePatterns = [];
    }
    if (!process.env.RUN_COMPONENT_TESTS) {
      config.testPathIgnorePatterns.push('<rootDir>/src/components/**/*.test.js');
    }
    if (!process.env.RUN_REDUCER_TESTS) {
      config.testPathIgnorePatterns.push('<rootDir>/src/reducers/**/*.test.js');
    }
    return config;
  }
}