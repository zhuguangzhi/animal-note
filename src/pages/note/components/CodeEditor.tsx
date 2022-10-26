import 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css';

import 'codemirror/mode/javascript/javascript.js';

import 'codemirror/theme/ayu-dark.css';

//ctrl+空格代码提示补全
import 'codemirror/addon/hint/show-hint.css'; // start-ctrl+空格代码提示补全
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';
import 'codemirror/addon/hint/css-hint.js';
import 'codemirror/addon/hint/html-hint.js';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/addon/hint/xml-hint.js';
import 'codemirror/addon/hint/anyword-hint.js'; // end
//代码高亮
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/selection/mark-selection';
import 'codemirror/addon/selection/selection-pointer';
// 代码折叠
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/xml-fold.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/markdown-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
//代码滚动
import 'codemirror/addon/scroll/simplescrollbars.js';
import 'codemirror/addon/scroll/simplescrollbars.css';
// 自动括号匹配功能
import 'codemirror/addon/edit/matchbrackets';
//全屏
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/addon/display/fullscreen.js';

// 搜索功能
// find：Ctrl-F (PC), Cmd-F (Mac)
// findNext：Ctrl-G (PC), Cmd-G (Mac)
// findPrev：Shift-Ctrl-G (PC), Shift-Cmd-G (Mac)
// replace：Shift-Ctrl-F (PC), Cmd-Alt-F (Mac)
// replaceAll：Shift-Ctrl-R (PC), Shift-Cmd-Alt-F (Mac)
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/jump-to-line';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/search/match-highlighter';

import React, { useEffect, useState } from 'react';
import './style/CodeMirror.less';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Editor, EditorConfiguration } from 'codemirror';
import { useSearchParam } from '@/hook/url';
import { codeType, ignoreCode } from '@/common/config';
import { findModel } from '@/pages/note/components/CodeEditorOption';

export const CodeEditor = () => {
  const [, setEditor] = useState<Editor | null>(null); //实例
  const [codeData] = useState(''); //编辑区数据
  const [{ nodeType }] = useSearchParam(['nodeType']);
  // 配置
  const [option, setOption] = useState<EditorConfiguration>({
    lineNumbers: true, //是否显示行数
    theme: 'ayu-dark', //主题
    mode: 'javascript',
    styleActiveLine: true, //光标代码高亮，
    smartIndent: true, //自动缩进
    spellcheck: true, //拼音检查
    lineWrapping: true, //代码自动换行 start
    foldGutter: true,
    gutters: [
      'CodeMirror-linenumbers',
      'CodeMirror-foldgutter',
      'CodeMirror-lint-markers',
    ], //折叠代码 end
    // tab宽度
    tabSize: 4,
    fullScreen: false, //全屏
    matchBrackets: true, //匹配括号
    hintOptions: {
      // 避免由于提示列表只有一个提示信息时，自动填充
      completeSingle: false,
      // hint: handleShowHint,
      // scrollMargin: -1
    }, // 代码提示功能
  });

  useEffect(() => {
    let model = findModel(nodeType as codeType);
    setOption(() => ({
      ...option,
      model: model?.mode || option.mode,
    }));
  }, [nodeType]);
  const editorDidMount = (e: Editor) => {
    //键入时提示
    e.on('inputRead', function (editor, change) {
      // console.log(editor.modeOption())
      //如{}等字符不提示
      if (ignoreCode.includes(change.text[change.text.length - 1])) return;
      e.showHint();
    });
    setEditor(e);
  };
  return (
    <CodeMirror
      value={codeData}
      className={'editor'}
      editorDidMount={editorDidMount}
      options={option}
    />
  );
};
export default CodeEditor;
