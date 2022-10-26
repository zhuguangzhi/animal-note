module.exports = {
  root: true,
  extends: require.resolve('@umijs/max/eslint'),
  rules: {
    // ↓禁止使用@ts-ignore来消除ESLint检查
    '@typescript-eslint/ban-ts-ignore': 'off',
    // ↓在函数和类方法上需要显式的返回类型
    '@typescript-eslint/explicit-function-return-type': 'off',
    // ↓禁止使用any类型
    '@typescript-eslint/no-explicit-any': 'error',
    // ↓除导入语句外，禁止使用require语句
    '@typescript-eslint/no-var-requires': 'error',
    // ↓禁止使用空函数
    '@typescript-eslint/no-empty-function': 'warn',
    // ↓禁止定义前使用
    'no-use-before-define': 'off',
    // ↓在定义变量之前不允许使用变量
    '@typescript-eslint/no-use-before-define': 'off',
    // ↓禁止使用@ts-注解
    '@typescript-eslint/ban-ts-comment': 'off',
    // ↓禁止使用特定类型
    '@typescript-eslint/ban-types': 'off',
    // ↓禁止使用!后缀运算符进行非null断言
    '@typescript-eslint/no-non-null-assertion': 'off',
    // ↓在导出的函数和类的公共类方法上需要显式的返回值和参数类型
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // ↓禁止使用未使用的变量
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^h$',
        varsIgnorePattern: '^h$',
      },
    ],
    // ↓禁止使用未使用的变量
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^h$',
        varsIgnorePattern: '^h$',
      },
    ],
    // ↓在函数括号前需要或不允许有空格
    'space-before-function-paren': 'off',
    'react/no-children-prop': 'off',
    'react/button-has-type': 'off',
  },
};
