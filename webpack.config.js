const path = require('path');

module.exports = {
  // altre configurazioni...
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser")
    }
  }
};

