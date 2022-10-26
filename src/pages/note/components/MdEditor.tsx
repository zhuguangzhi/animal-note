import React, { useState } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { useMounted } from '@/hook';
import './style/MdEditor.less';

export const MdEditor = () => {
  const [, setEditor] = useState<Vditor>();
  useMounted(() => {
    setEditor(
      new Vditor('editor', {
        height: '100%',
        mode: 'sv',
        toolbar: [
          'emoji',
          'headings',
          'bold',
          'italic',
          'strike',
          'link',
          '|',
          'list',
          'ordered-list',
          'check',
          'outdent',
          'indent',
          '|',
          'quote',
          'line',
          'code',
          'inline-code',
          'insert-before',
          'insert-after',
          '|',
          'upload',
          'record',
          'table',
          '|',
          'undo',
          'redo',
          '|',
          'fullscreen',
          'edit-mode',
          {
            name: 'more',
            toolbar: [
              'both',
              'code-theme',
              'content-theme',
              'export',
              'outline',
              'preview',
            ],
          },
        ],
        preview: {
          // theme: ""
        },
      }),
    );
  });
  return <div id="editor" className="vditor" />;
};
export default MdEditor;
