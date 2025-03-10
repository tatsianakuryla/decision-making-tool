const js = (await import('@eslint/js')).default;
const tseslint = (await import('@typescript-eslint/eslint-plugin')).default;
const tsparser = (await import('@typescript-eslint/parser')).default;
const unicorn = (await import('eslint-plugin-unicorn')).default;

/** @type {import("eslint").FlatConfig[]} */
export default [
  {
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      unicorn: unicorn,
    },
    rules: {
      ...js.rules,
      ...tseslint.configs.recommended.rules,
      ...unicorn.configs.recommended.rules,

      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'unicorn/prefer-query-selector': 'warn',
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'never' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'off' } },
      ],
      '@typescript-eslint/member-ordering': 'error',
      'class-methods-use-this': 'error',

      // Добавляем ваши дополнительные правила
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/number-literal-case': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            acc: true,
            env: true,
            i: true,
            j: true,
            props: true,
            Props: true,
          },
        },
      ],
    },
    files: ['**/*.{ts,tsx}'],
    settings: {
      eslint: {
        // Включаем правила noInlineConfig и reportUnusedDisableDirectives
        noInlineConfig: true,
        reportUnusedDisableDirectives: true,
      },
    },
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': 'warn',
    },
    files: ['**/*.js'],
  },
];