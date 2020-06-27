module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    // this next line sets up both eslint-config-prettier and eslint-plugin-prettier
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks',
    'prettier',
    'jsx-a11y'
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      alias: {
        map: [
          ['@app', './src/@app'],
          ['@lib', './src/@lib']
        ],
      }
    }
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/self-closing-comp': 'error',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 100,
        semi: false,
      },
    ],
    'import/order': ['error', {
      alphabetize: { order: 'asc' },
      'newlines-between': 'always',
      pathGroups: [
        {
          'pattern': '@app/**',
          'group': 'external',
          'position': 'after'
        },
        {
          'pattern': '@lib/**',
          'group': 'external',
          'position': 'after'
        }
      ],
      pathGroupsExcludedImportTypes: ['builtin'],
    }],
  }
}
