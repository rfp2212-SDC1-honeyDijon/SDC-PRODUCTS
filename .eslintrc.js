module.exports = {
  env: {
    es6: true,
    browser: true, /* need for document to be considered global */
    'jest/globals': true,
  },
  parserOptions: { /* necessary otherwise lints all react jsx */
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['jest'],
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react/prop-types': 'off',
    'import/extensions': ['error', { jsx: 'always' }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'jsx-a11y/img-redundant-alt': 'off',
    camelcase: ['error', {
      allow: [
        'product_id',
        'default_price',
        'created_at',
        'updated_at',
        'question_id',
        'answer_id',
      ],
    }],
  },
};
