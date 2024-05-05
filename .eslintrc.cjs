module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts'],
  rules: {
    // JS
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    'prefer-const': 2,
    curly: [2, 'all'],
    'no-redeclare': [2, { builtinGlobals: true }],
    'operator-linebreak': 0,
    'no-console': 1,
    'brace-style': [2, '1tbs'],
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'no-param-reassign': [2, { props: true }],
    'padding-line-between-statements': [
      2,
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],

    // React
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'import/prefer-default-export': 0,
    'standard/no-callback-literal': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/destructuring-assignment': 0,
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': [2, 'never'],
    'react-hooks/rules-of-hooks': 2,
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: {
          some: ['id', 'nesting'],
        },
        allowChildren: true,
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],

    // Typescript
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
