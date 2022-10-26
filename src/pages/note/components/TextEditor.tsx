import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor, RawEditorOptions } from 'tinymce/tinymce';
import { useRef, useState } from 'react';
import { TinyKeyApi } from '@/common/config';
import './style/TextEditor.less';

export const TextEditor = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [editorOption] = useState<
    RawEditorOptions & { selector?: undefined; target?: undefined }
  >({
    language: 'zh_CN',
    // selector: "#textEditor",
    // height: "100%",
    menubar: false, //隐藏菜单栏
    plugins: [
      'advlist',
      'autolink',
      'link',
      'image',
      'lists',
      'charmap',
      'preview',
      'anchor',
      'pagebreak',
      'searchreplace',
      'wordcount',
      'visualblocks',
      'visualchars',
      'code',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'emoticons',
      'codesample',
      'pagebreak',
      'nonbreaking',
      'preview',
      'searchreplace',
      'visualblocks',
      'visualchars',
      'wordcount',
    ],
    toolbar: `undo redo | fontsize fontfamily styles |
         forecolor backcolor |
          link unlink code removeformat | hr  indent outdent 
             | bullist numlist checklist table blockquote foldtext codeinline codesample latex | 
             emoticons image media | pagebreak nonbreaking preview searchreplace visualblocks visualchars wordcount fullscreen `,
    toolbar_mode: 'wrap',
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
  });

  return (
    <div className="my-component">
      <Editor
        id={'textEditor'}
        apiKey={TinyKeyApi}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={editorOption}
      />
    </div>
  );
};
export default TextEditor;
