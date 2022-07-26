import { useSearchParam } from '@/hook/url';
import { keyConfig } from '@/common/keyConfig';
import './style/addNote.less';
import { message, Tooltip } from 'antd';
import { IconFont } from '@/components/IconFont';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import {
  BookType,
  mainFileList,
  MainFileType,
  noteInfoProps,
} from '@/type/bookType';
import { AniPopoverMenu, MenuType } from '@/components/AniPopoverMenu';
import { themOption } from '@/pages/note/components/CodeEditorOption';
import { AniPopup } from '@/components/AniPopup';
import { UseNode } from '@/components/UseNode';
import { translateCode, useSetState } from '@/util';
import MoveBook from '@/components/MoveBook';
import { connect, Dispatch } from 'umi';
import { OpenFolder } from '@/components/OpenFolder';

const codeEditor = React.lazy(() => import('./components/CodeEditor'));
const mdEditor = React.lazy(() => import('./components/MdEditor'));
const textEditor = React.lazy(() => import('./components/TextEditor'));

interface NodeInfoType extends noteInfoProps {
  noteBookInfo: BookType;
}

type changePopupType =
  | 'openDeletePopup'
  | 'moveFilePopup'
  | 'moveSignType'
  | 'openFilePopup';

const AddNote = ({ dispatch }: { dispatch: Dispatch }) => {
  const { nodeIdKey } = keyConfig;
  // nodeType 笔记类型 传给编辑器让他们选择语言
  const [nodeInfo] = useSearchParam([nodeIdKey]);
  console.log('nodeId', nodeInfo[nodeIdKey]);
  const [state, setState] = useState({
    noteInfo: {
      id: 1,
      title: '软件工程',
      key: '122',
      type: 'ts',
      noteBookInfo: {
        id: 1,
        title: '测试文件夹',
        key: '1',
        desc: '我是测试描述',
      },
    } as NodeInfoType, //当前笔记的信息
    openDeletePopup: false, // 打开删除提示
    moveFilePopup: false, //移动文件弹窗
    moveSignType: false, //移动标签弹窗
    openFilePopup: false, //打开其他文件
    codeOption: {
      isFullScreen: false,
      theme: 'ayu-dark',
      defaultValue: '',
    }, //code编辑器默认值
    editorType: 'text' as MainFileType, //使用哪个编辑器
    codeEditorMenuItems: [
      {
        label: '全屏',
        key: 'fullscreen',
        icon: 'quanping',
      },
      {
        label: '主题',
        key: 'theme',
        icon: 'pifu',
        children: themOption.reduce((preValue, value) => {
          return [...preValue, { label: value, key: value }];
        }, [] as MenuType[]),
      },
    ] as MenuType[], //code编辑器的设置菜单
  });
  const changeState = useSetState<typeof state>(state, setState);

  // 保存
  const onSave = () => {
    message.success('保存成功');
  };
  //关闭\开启确认弹窗
  const changePopup = (type: changePopupType = 'openDeletePopup') => {
    changeState({
      [type]: !state[type],
    });
  };
  const EditorComponent = useMemo(() => {
    return state.editorType === 'code'
      ? codeEditor
      : state.editorType === 'md'
      ? mdEditor
      : textEditor;
  }, [state.editorType]);
  //修改文件名和类型
  const editFileTitle = () => {
    const res = translateCode(state.noteInfo.type);
    dispatch({
      type: 'editFilePopup/openPopup',
      payload: {
        fileKey: state.noteInfo.key,
        title: '修改' + res.desc,
        type: res.type,
        fileDefaultValue: [
          { name: 'title', value: state.noteInfo.title },
          { name: 'codeType', value: state.noteInfo.type },
        ],
      },
    });
  };

  // 修改当前所在文件夹的信息
  const editFolderInfo = () => {
    dispatch({
      type: 'editFilePopup/openPopup',
      payload: {
        fileKey: state.noteInfo.noteBookInfo.key,
        title: '修改文件夹',
        type: 'Folder',
        fileDefaultValue: [
          { name: 'title', value: state.noteInfo.noteBookInfo.title },
          { name: 'desc', value: state.noteInfo.noteBookInfo.desc },
        ],
      },
    });
  };

  useEffect(() => {
    //是否是code文件
    if (mainFileList.includes(state.noteInfo.type))
      changeState({ editorType: state.noteInfo.type as Partial<MainFileType> });
    else changeState({ editorType: 'code' });
  }, [state.noteInfo.type]);

  return (
    <div className={'animate__animated animate__fadeIn addNote'}>
      <div className={'noteHeader'}>
        <div className={'noteHeaderTitle'}>
          <span className={'font_18 cursor'} onClick={editFileTitle}>
            {state.noteInfo.title + '.' + state.noteInfo.type}
          </span>
          <div className={'noteHeaderTitleDesc'}>
            <IconFont
              onClick={() => changePopup('openFilePopup')}
              className={'cursor'}
              marginRight={'6px'}
              width={'16px'}
              height={'16px'}
              icon={'folder'}
            />
            <span
              onClick={() => changePopup('openFilePopup')}
              className={'cursor'}
            >
              {state.noteInfo.noteBookInfo.title}
            </span>
            <span onClick={editFolderInfo}>
              {state.noteInfo.noteBookInfo.desc}
            </span>
          </div>
        </div>
        {/*功能区*/}
        <div className={'noteHeaderArea'}>
          <UseNode rIf={state.editorType === 'code'}>
            <AniPopoverMenu
              trigger={'click'}
              placement={'leftBottom'}
              menuItems={state.codeEditorMenuItems}
              defaultSelect={'ambiance'}
            >
              <i>
                <IconFont className={'icon'} icon={'set'} />
              </i>
            </AniPopoverMenu>
          </UseNode>
          <Tooltip placement="bottom" title={'移动到'}>
            <i onClick={() => changePopup('moveFilePopup')}>
              <IconFont className={'icon'} icon={'21move'} />
            </i>
          </Tooltip>
          <Tooltip placement="bottom" title={'标签'}>
            <i>
              <IconFont className={'icon'} icon={'qiehuanbiaoqianfeiyushi'} />
            </i>
          </Tooltip>
          <Tooltip placement="bottom" title={'分享'}>
            <i>
              <IconFont className={'icon'} icon={'share'} />
            </i>
          </Tooltip>
          <IconFont className={'icon'} icon={'collect'} />

          <IconFont onClick={changePopup} className={'icon'} icon={'shanchu'} />
          <Tooltip placement="bottom" title={'保存至云端'}>
            <i onClick={onSave}>
              <IconFont className={'icon'} icon={'save'} />
            </i>
          </Tooltip>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <Suspense>
          <EditorComponent />
        </Suspense>
      </div>
      {/*删除*/}
      <AniPopup
        onClose={() => changePopup()}
        title={`是否删除 "${state.noteInfo.title}"`}
        open={state.openDeletePopup}
        showClose={true}
      >
        <p>删除后30天内可在回收站中找回哦！</p>
      </AniPopup>
      {/*    移动文件*/}
      <MoveBook
        bookInfo={state.noteInfo}
        open={state.moveFilePopup}
        closeMove={() => changePopup('moveFilePopup')}
      />
      {/*  打开另一个笔记*/}
      <OpenFolder
        bookInfo={state.noteInfo}
        open={state.openFilePopup}
        closeMove={() => changePopup('openFilePopup')}
      />
    </div>
  );
};
export default connect()(AddNote);
