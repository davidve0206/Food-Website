module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  /* ignorePatterns: ['dist', '.eslintrc.cjs'], */
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    "ecmaFeatures": {
      "jsx": true
    }
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react', 'react-hooks', 'react-refresh'],
  rules: {

  },
}
