module.exports = {
  presets: ['@babel/preset-env'],
  env: {
    production: {
      ignore: ['**/*.test.js'],
    },
    development: {
      ignore: ['**/*.test.js'],
    },
  },
};