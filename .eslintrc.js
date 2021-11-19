module.exports = {
  root: true,
  env: {
    node: true,
    'jest/globals': true,
  },
  plugins: ['jest'],
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    '@vue/prettier',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
