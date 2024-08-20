import { defineFlatConfig } from 'eslint-define-config'; // Import defineFlatConfig from eslint-define-config
import eslintPluginReact from 'eslint-plugin-react'; // Import eslint-plugin-react
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'; // Import eslint-plugin-react-hooks
import eslintPluginJest from 'eslint-plugin-jest'; // Import eslint-plugin-jest
import eslintPluginPrettier from 'eslint-plugin-prettier'; // Import eslint-plugin-prettier
import eslintConfigAirbnb from 'eslint-config-airbnb'; // Import eslint-config-airbnb
import eslintConfigAirbnbHooks from 'eslint-config-airbnb/hooks'; // Import eslint-config-airbnb/hooks
import eslintConfigPrettier from 'eslint-config-prettier'; // Import eslint-config-prettier

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
        ecmaVersion: 'latest',
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
      quotes: ['error', 'single'],
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
      '**/node_modules/**', // Ignore all node_modules directories
      'build/', // Ignore build directories
      'dist/', // Ignore dist directories
      'public/', // Ignore public directories
      '**/*.css', // Ignore all CSS files
      '**/*.html', // Ignore all HTML files
      '**/*.json', // Ignore all JSON files
      '**/*.md', // Ignore all Markdown files
      '**/__snapshots__/**', // Ignore all snapshot directories
      '**/.next/**', // Ignore Next.js build directories
      '**/.nuxt/**', // Ignore Nuxt.js build directories
      '**/.cache/**', // Ignore cache directories
    ],
  },
]);
