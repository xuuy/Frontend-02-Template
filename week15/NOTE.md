### react + typescript

- ts-loader
  - support js(x) and ts(x)
    
    `ts-loader`配合`babel-loader`的时候`jsx`必须是`preserve`
    ```json
    // tsconfjg.json
    {
      "jsx": "preserve",
      "esModuleInterop": true
    }
    ```

    ```js
    // webpack.config.js
    {
      test: /\.(js|jsx)$/,
      exclude: /node-modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false
        }
      }
    },
    {
        test: /\.(ts|tsx)$/,
        exclude: /node-modules/,
        use: [
          'babel-loader',
          'ts-loader'
        ]
    }
    ```

  - only support ts(x)

    ```json
    // tsconfjg.json
    {
      "jsx": "react",
      "esModuleInterop": true
    }
    ```

    ```js
    // webpack.config.js
    {
        test: /\.(ts|tsx)$/,
        exclude: /node-modules/,
        use: [
          'babel-loader',
          'ts-loader'
        ]
    }
    ```

- babel-loader(need `babel7+`)
  - support js(x) and ts(x)
  - only support ts(x)

    ```json
    // .babelrc
    {
      "presets": [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript"
      ]
    }
    ```

    ```js
    // webpack.config.js
    {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node-modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false
          }
        }
    }
    ```


### eslint + prettier

1. add dependencies use `yarn add -D *`

- eslint
- prettier
- eslint-config-react-app
- eslint-config-airbnb
- eslint-config-prettier
- eslint-plugin-import
- eslint-plugin-jsx-a11y
- eslint-plugin-prettier
- eslint-plugin-react
- eslint-plugin-react-hooks
- eslint-plugin-flowtype
- @typescript-eslint/parser
- @typescript-eslint/eslint-plugin

2. create `.eslintrc.js`

```js
module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'react-app'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    camelCase: 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/label-has-for': 0,
    'no-underscore-dangle': ['error', { allow: ['__typename'] }],
    'prefer-destructuring': 0,
    'prettier/prettier': 0,
    'react/button-has-type': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    // https://github.com/benmosher/eslint-plugin-import/issues/1615
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'never',
        'd.ts': 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.json', '.d.ts'],
      },
    },
  },
}
```