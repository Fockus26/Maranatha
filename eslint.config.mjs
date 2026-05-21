import js from '@eslint/js'

import nextPlugin from '@next/eslint-plugin-next'

import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import reactPlugin from 'eslint-plugin-react'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'

import tseslint from 'typescript-eslint'

import globals from 'globals'

export default [
	{
		ignores: [
			'.next/**',
			'out/**',
			'build/**',
			'dist/**',
			'coverage/**',
			'node_modules/**',
		],
	},

	js.configs.recommended,

	{
		files: ['**/*.ts', '**/*.tsx'],

		languageOptions: {
			parser: tseslint.parser,

			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: import.meta.dirname,
			},

			globals: {
				...globals.browser,
				...globals.node,
			},
		},

		settings: {
			react: {
				version: 'detect',
			},

			'import/resolver': {
				typescript: true,
			},
		},

		plugins: {
			'@typescript-eslint': tseslint.plugin,

			'@next/next': nextPlugin,

			import: importPlugin,

			react: reactPlugin,

			'react-hooks': reactHooks,

			'jsx-a11y': jsxA11y,

			'simple-import-sort': simpleImportSort,

			'unused-imports': unusedImports,
		},

		rules: {
			/* TYPESCRIPT */

			'@typescript-eslint/no-explicit-any': 'error',

			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					prefer: 'type-imports',
					fixStyle: 'inline-type-imports',
				},
			],

			'@typescript-eslint/explicit-function-return-type': [
				'error',
				{
					allowExpressions: false,
				},
			],

			/* IMPORTS */

			'import/no-default-export': 'error',

			'import/order': 'off',

			'import/no-relative-parent-imports': 'off',

			'simple-import-sort/imports': [
				'error',
				{
					groups: [['^react$', '^next', '^@?\\w'], ['^@/'], ['^\\.']],
				},
			],

			'simple-import-sort/exports': 'error',

			/* UNUSED */

			'no-unused-vars': 'off',

			'@typescript-eslint/no-unused-vars': 'off',

			'unused-imports/no-unused-imports': 'error',

			'unused-imports/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],

			/* REACT */

			'react/function-component-definition': [
				'error',
				{
					namedComponents: 'arrow-function',
				},
			],

			'react-hooks/rules-of-hooks': 'error',

			'react-hooks/exhaustive-deps': 'warn',

			/* ACCESSIBILITY */

			'jsx-a11y/alt-text': 'warn',

			/* NEXT */

			'@next/next/no-img-element': 'error',

			/* LOGGING */

			'no-console': [
				'error',
				{
					allow: ['info', 'error', 'debug'],
				},
			],

			/* GENERAL */

			'max-lines': [
				'warn',
				{
					max: 300,
					skipBlankLines: true,
					skipComments: true,
				},
			],

			'max-params': ['warn', 4],

			complexity: ['warn', 10],
		},
	},

	{
		files: [
			'vitest.config.ts',
			'next.config.ts',
			'proxy.ts',
			'i18n/request.ts',
			'app/manifest.ts',
			'app/robots.ts',
			'app/sitemap.ts',
			'app/**/page.tsx',
			'app/**/layout.tsx',
			'app/**/loading.tsx',
			'app/**/error.tsx',
			'app/**/not-found.tsx',
			'components/**/**.module.scss.d.ts',
			'types/**/*.d.ts',
		],

		rules: {
			'import/no-default-export': 'off',
		},
	},
]
