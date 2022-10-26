import { codeType } from '@/common/config';

export const themOption = [
  '3024-day',
  '3024-night',
  'abbott',
  'abcdef',
  'ambiance-mobile',
  'ambiance',
  'ayu-dark',
  'ayu-mirage',
  'base16-dark',
  'base16-light',
  'bespin',
  'blackboard',
  'cobalt',
  'colorforth',
  'darcula',
  'dracula',
  'duotone-dark',
  'duotone-light',
  'eclipse',
  'elegant',
  'erlang-dark',
  'gruvbox-dark',
  'hopscotch',
  'icecoder',
  'idea',
  'isotope',
  'juejin',
  'lesser-dark',
  'liquibyte',
  'lucario',
  'material-darker',
  'material-ocean',
  'material-palenight',
  'material',
  'mbo',
  'mdn-like',
  'midnight',
  'monokai',
  'moxer',
  'neat',
  'neo',
  'night',
  'nord',
  'oceanic-next',
  'panda-syntax',
  'paraiso-dark',
  'paraiso-light',
  'pastel-on-dark',
  'railscasts',
  'rubyblue',
  'seti',
  'shadowfox',
  'solarized',
  'ssms',
  'the-matrix',
  'tomorrow-night-bright',
  'tomorrow-night-eighties',
  'ttcn',
  'twilight',
  'vibrant-ink',
  'xq-dark',
  'xq-light',
  'yeti',
  'yonce',
  'zenburn',
];
export type modelType = {
  mode: string;
  codeName: string;
  url: string;
};
const modeOption: modelType[] = [
  {
    codeName: 'c',
    url: 'click/click.js',
    mode: 'text/x-csrc',
  }, //c
  {
    codeName: 'cpp',
    url: 'click/click.js',
    mode: 'text/x-c++src',
  }, //c++
  {
    codeName: 'csharp',
    url: 'click/click.js',
    mode: 'text/x-csharp',
  }, //c#
  {
    codeName: 'java',
    url: 'click/click.js',
    mode: 'text/x-java',
  }, //java
  {
    codeName: 'css',
    url: 'css/css.js',
    mode: 'text/css',
  }, //css
  {
    codeName: 'less',
    url: 'css/css.js',
    mode: 'text/less',
  }, //less
  {
    codeName: 'sass',
    url: 'sass/sass.js',
    mode: 'text/sass',
  }, //sass
  {
    codeName: 'dart',
    url: 'dart/dart.js',
    mode: 'dart',
  }, //dart
  {
    codeName: 'diff',
    url: 'diff/diff.js',
    mode: 'text/x-diff',
  }, //diff
  {
    codeName: 'go',
    url: 'go/go.js',
    mode: 'text/x-go',
  }, //go
  {
    codeName: 'js',
    url: 'javascript/javascript.js',
    mode: 'text/javascript',
  }, //js
  {
    codeName: 'json',
    url: 'javascript/javascript.js',
    mode: 'application/x-json',
  }, //json
  {
    codeName: 'ts',
    url: 'javascript/javascript.js',
    mode: 'application/typescript',
  }, //ts
  {
    codeName: 'md',
    url: 'markdown/markdown.js',
    mode: 'text/x-markdown',
  }, //md
  {
    codeName: 'php',
    url: 'php/php.js',
    mode: 'text/x-php',
  }, //php
  {
    codeName: 'shell',
    url: 'powershell/powershell',
    mode: 'application/x-powershell',
  }, //shell
  {
    codeName: 'ruby',
    url: 'ruby/ruby.js',
    mode: 'text/x-ruby',
  }, //ruby
  {
    codeName: 'rust',
    url: 'rust/rust.js',
    mode: 'text/x-rustsrc',
  }, //rust
  {
    codeName: 'stylus',
    url: 'stylus/stylus.js',
    mode: 'text/x-styl',
  }, //stylus
  {
    codeName: 'scheme',
    url: 'scheme/scheme.js',
    mode: 'text/x-scheme',
  }, //scheme
  {
    codeName: 'sql',
    url: 'sql/sql.js',
    mode: 'text/x-sql',
  }, //sql
  {
    codeName: 'mysql',
    url: 'sql/sql.js',
    mode: 'text/x-mysql',
  }, //mysql
  {
    codeName: 'swift',
    url: 'swift/swift.js',
    mode: 'text/x-swift',
  }, //swift
  {
    codeName: 'vue',
    url: 'vue/vue.js',
    mode: 'text/x-vue',
  }, //vue
  {
    codeName: 'html',
    url: 'xml/xml.js',
    mode: 'text/html',
  }, //html
  {
    codeName: 'xml',
    url: 'xml/xml.js',
    mode: 'application/xml',
  }, //xml
];

export const findModel = (_type: codeType): modelType | null => {
  const res = modeOption.find((item) => item.codeName === _type);
  if (!res) return null;
  return {
    codeName: res.codeName,
    url: res.url,
    mode: res.mode,
  };
};
