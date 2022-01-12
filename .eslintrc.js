module.exports = {
  extends: ['@scatterlab/eslint-config/react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.eslint.json',
    sourceType: 'module',
  },
};
