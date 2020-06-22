module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'no-restricted-syntax': 0,
    'no-return-assign': 0,
    'no-unused-expressions': 0,
    'react/no-find-dom-node': 0,
    'class-methods-use-this': 0,
    'no-nested-ternary': 0,
    'prefer-destructuring': 0,
    'no-lonely-if': 0,
    'no-param-reassign': 0,
    'react/no-unused-state': 1,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'consistent-return': 0,
    'no-continue': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'no-else-return': 0,
  }
};
