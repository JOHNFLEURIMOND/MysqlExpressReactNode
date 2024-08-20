import { defineFlatConfig } from 'eslint-define-config';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginJest from 'eslint-plugin-jest';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigAirbnb from 'eslint-config-airbnb';
import eslintConfigAirbnbHooks from 'eslint-config-airbnb/hooks';
import eslintConfigPrettier from 'eslint-config-prettier';

// Combine all rules and settings
const airbnbConfig = {
  rules: eslintConfigAirbnb.rules,
  settings: eslintConfigAirbnb.settings,
};

const airbnbHooksConfig = {
  rules: eslintConfigAirbnbHooks.rules,
};

const prettierConfig = {
  rules: eslintConfigPrettier.rules,
};

export default defineFlatConfig([
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      jest: eslintPluginJest,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...airbnbConfig.rules,
      ...airbnbHooksConfig.rules,
      ...prettierConfig.rules,
      quotes: ['error', 'single'], // Ensure this matches your code style
      indent: 'off',
      'no-console': 'off',
      semi: ['error', 'always'],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': 'error',
      'jest/no-commented-out-tests': 'off',
    },
    settings: {
      ...airbnbConfig.settings,
      react: {
        version: 'detect',
      },
    },
    ignores: [
      '**/node_modules/**',
      'build/',
      'dist/',
      'public/',
      '*.css',
      '*.html',
      '*.json',
      '*.md',
      '**/__snapshots__/**',
    ],
  },
]);
