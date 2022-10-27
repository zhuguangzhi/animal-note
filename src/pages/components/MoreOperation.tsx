//更多操作的选项
import { BookType } from '@/type/bookType';
import { AniPopoverMenu, MenuType } from '@/components/AniPopoverMenu';
import { IconFont } from '@/components/IconFont';
import React from 'react';
import { TooltipPlacement } from 'antd/es/tooltip';
import { connect, Dispatch } from 'umi';

export type MoreOperationProps = {
  fileKey: string; //操作的文件的key
  className?: string;
  type: BookType['type']; //文件类型
  placement?: TooltipPlacement;
  trigger?: string;
  dispatch: Dispatch;
};

const menuItems = (type: BookType['type']) => {
  return [
    type === 'folder'
      ? {
          label: '新建',
          key: 'add',
          icon: 'addFolder',
          children: [
            {
              label: '新建文件夹',
              key: 'addFolder',
              icon: 'addFolder',
            },
            {
              label: '新建文本文件',
              key: 'addText',
              icon: 'text',
            },
            {
              label: '新建Markdown文件',
              key: 'addMd',
              icon: 'md',
            },
            {
              label: '新建代码文件',
              key: 'addCode',
              icon: 'code',
            },
          ],
        }
      : null,

    {
      label: '移动到',
      key: 'moveFolder',
      icon: 'moveFolder',
    },
    {
      label: '标签',
      key: 'moveSign',
      icon: 'moveSign',
    },
    type === 'folder'
      ? {
          label: '删除文件夹',
          key: 'delFolder',
          icon: 'delFolder',
        }
      : {
          label: '删除文件',
          key: 'delFolder',
          icon: 'delFolder',
        },
  ] as MenuType[];
};
//更多操作
const MoreOperation = ({
  type,
  className,
  placement,
  trigger,
  dispatch,
}: MoreOperationProps) => {
  //更多操作事件
  const onSelectEvent = (e: MenuType) => {
    console.log('e', e);
    switch (e.key) {
      case 'addFolder':
        openEditPopup('Folder', e.label);
        break;
      case 'addText':
        openEditPopup('File', e.label);
        break;
      case 'addMd':
        openEditPopup('File', e.label);
        break;
      case 'addCode':
        openEditPopup('Code', e.label);
        break;
    }
  };
  const openEditPopup = (type: MenuType['type'], title: string) => {
    dispatch({
      type: 'editFilePopup/openPopup',
      payload: {
        title,
        type,
      },
    });
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`font_20 cursor flex flex_justify ${className}`}
    >
      <AniPopoverMenu
        trigger={trigger || 'hover'}
        placement={placement}
        menuItems={menuItems(type)}
        onSelect={onSelectEvent}
      >
        <i>
          <IconFont
            width={'14px'}
            height={'14px'}
            className={'iconFont'}
            icon={'gengduo'}
          />
        </i>
      </AniPopoverMenu>
    </div>
  );
};

export default connect()(MoreOperation);
