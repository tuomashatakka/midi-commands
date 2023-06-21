const rules = {
  // A temporary hack related to IDE not resolving correct package.json
  'react/react-in-jsx-scope':            'off',
  'import/no-import-module-exports':     'off',
  'no-shadow':                           'off',
  '@typescript-eslint/no-shadow':        'error',
  '@typescript-eslint/no-unused-vars':   'error',
  "react/function-component-definition": [
    "warn",
    {
      "namedComponents":   "arrow-function",
      "unnamedComponents": "arrow-function",
    },
  ],
  'no-console':                            [ 'warn', { allow: [ 'warn', 'error' ] }],
  "react/jsx-filename-extension":          [ 1, { "extensions": [ ".js", ".jsx", ".ts", ".tsx" ] }],
  "react/prop-types":                      [ "warn" ],
  "import/extensions":                     [ "off" ],
  "import/no-unresolved":                  [ "off" ],
  "import/no-extraneous-dependencies":     [ "error", { "devDependencies": true }],
  "import/prefer-default-export":          "off",
  "no-plusplus":                           "off",
  "no-trailing-spaces":                    [ "warn" ],
  "no-unused-vars":                        [ "warn" ],
  "react/jsx-props-no-spreading":          [ "off" ],
  "import/no-named-as-default":            [ "off" ],
  "react/no-children-prop":                [ "warn" ],
  "react/jsx-no-duplicate-props":          [ "off" ],
  "linebreak-style":                       [ "off" ],
  "max-len":                               [ "warn", 160 ],
  "react-hooks/exhaustive-deps":           [ "off" ],
  "no-nested-ternary":                     [ "off" ],
  "react/jsx-boolean-value":               [ "off" ],
  "camelcase":                             [ "off" ],
  "react/forbid-prop-types":               [ "off" ],
  "jsx-a11y/mouse-events-have-key-events": [ "off" ],
  "react/no-array-index-key":              [ "off" ],
  "no-useless-return":                     [ "warn" ],
  "prefer-spread":                         "off",
  "radix":                                 "off",
  "block-spacing":                         [ "warn", "always" ],
  "space-before-blocks":                   [ "warn",  "always" ],
  "operator-linebreak":                    [ "warn", "after", { "overrides": {
    "?": "before",
    ":": "before",
  } }],
  // 'padded-blocks':               w,
  "func-call-spacing":              "warn",
  "function-call-argument-newline": [ "warn", "consistent" ],
  "space-before-function-paren":    [ "warn", "always" ],
  "object-curly-spacing":           [ "warn", "always", { "arraysInObjects": true }],
  "array-bracket-spacing":          [ "warn", "always", { "arraysInArrays": false, "objectsInArrays": false }],
  "brace-style":                    [ "warn", "stroustrup", { "allowSingleLine": true }],
  "object-property-newline":        [ "warn", { "allowAllPropertiesOnSameLine": true }],
  "lines-between-class-members":    [ "warn", "always", { "exceptAfterSingleLine": true }],
  "lines-around-comment":           [ "warn", {
    "beforeBlockComment": true,
    "afterBlockComment":  false,
    "ignorePattern":      "----",
  }],
  "key-spacing": [ "warn", {
    "singleLine": {
      "beforeColon": false,
      "afterColon":  true,
    },
    "multiLine": {
      "beforeColon": false,
      "afterColon":  true,
      "align":       "value",
    },
  }],
  "keyword-spacing":                 "warn",
  "comma-spacing":                   "warn",
  "comma-style":                     [ "warn", "last" ],
  "comma-dangle":                    [ "warn", "always-multiline" ],
  "padding-line-between-statements": [
    "warn",
    { blankLine: "always", prev: "*", next: "directive" },
    { blankLine: "never", prev: "import", next: "import" },
    { blankLine: "always", prev: "block-like", next: "*" },
    { blankLine: "always", prev: "*", next: "block-like" },

    { blankLine: "always",  prev: [ "const", "var", "let" ], next: "*" },
    { blankLine: "never",
      prev:      [ "singleline-const", "singleline-var", "singleline-let" ],
      next:      [ "singleline-const", "singleline-var", "singleline-let" ] },

    // { blankLine: "never", prev: "directive", next: "return" },
    { blankLine: "never", prev: "block-like", next: "return" },
    { blankLine: "never", prev: "return", next: "return" },
    { blankLine: "never", prev: "return", next: "empty" },
  ],

  //   options[2].prev must be one of the following:
  //   '*'
  //  'block-like'
  //  'cjs-export'
  //  'cjs-import'
  //  'directive'
  //  'expression'
  //  'iife'
  //  'multiline-block-like'
  //  'multiline-expression'
  //  'multiline-const'
  //  'multiline-let'
  //  'multiline-var'
  //  'singleline-const'
  //  'singleline-let'
  //  'singleline-var'
  //  'block'
  //  'empty'
  //  'function'
  //  'break'
  //  'case'
  //  'class'
  //  'const'
  //  'continue'
  //  'debugger'
  //  'default'
  //  'do'
  //  'export'
  //  'for'
  //  'if'
  //  'import'
  //  'let'
  //  'return'
  //  'switch'
  //  'throw'
  //  'try'
  //  'var'
  //  'while'
  //  'with'
  //   and one of the following: '*'
  //  'block-like'
  //  'cjs-export'
  //  'cjs-import'
  //  'directive'
  //  'expression'
  //  'iife'
  //  'multiline-block-like'
  //  'multiline-expression'
  //  'multiline-const'
  //  'multiline-let'
  //  'multiline-var'
  //  'singleline-const'
  //  'singleline-let'
  //  'singleline-var'
  //  'block'
  //  'empty'
  //  'function'
  //  'break'
  //  'case'
  //  'class'
  //  'const'
  //  'continue'
  //  'debugger'
  //  'default'
  //  'do'
  //  'export'
  //  'for'
  //  'if'
  //  'import'
  //  'let'
  //  'return'
  //  'switch'
  //  'throw'
  //  'try'
  //  'var'
  //  'while'
  //  'with'

// "prettier/prettier": ["error"],
  // "semi":                  [ "warn", "never" ],
  // "arrow-parens":        "warn"
}

module.exports = {
  "ecmaFeatures": {
    "modules": true,
  },
  "root": true,
  "env":  {
    "es6":      true,
    "node":     true,
    "browser":  true,
    "commonjs": true,
  },

  "extends": [
    "eslint:recommended",
    "airbnb",
    "airbnb/hooks",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ],
  "plugins": [
    "react",
    "prettier",
    "@typescript-eslint",
  ],
  rules,
  parserOptions: {
    ecmaVersion:          2020,
    sourceType:           'module',
    project:              './tsconfig.json',
    tsconfigRootDir:      __dirname,
    createDefaultProgram: true,
    "ecmaFeatures":       {
      "jsx": true,
    },
  },
  "ignorePatterns": [ "node_modules/", "dist/", "webpack.*" ],

  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node:    {},
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
      },
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': [ '.ts', '.tsx' ],
    },
  },
};
