import { defineConfig } from '@umijs/max';
import { routes } from './src/router';
import { resolve } from 'path';

export default defineConfig({
  title: 'AnimalNote',
  alias: {
    '@': resolve(__dirname, '/src'),
  },
  history: {
    type: 'hash',
  },
  scripts: [
    'https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_17461_23.233fbba8b2adfc1feffcc4bd66357b6c.js', //字节图标库
    '//at.alicdn.com/t/c/font_3547262_ttqsmcip31s.js', //阿里图标库
    'https://www.xiaopang.cool/static/lib/animalNote/tinymce_6.2.0/tinymce.min.js',
  ],
  routes: routes,
  npmClient: 'yarn',
  layout: false,
});
