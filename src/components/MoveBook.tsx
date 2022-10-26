import { AniPopup } from '@/components/AniPopup';
import React, { useState } from 'react';
import { BookTree, SelectKeys, SelectOptionProps } from '@/components/BookTree';
import { FolderSideType, noteInfoProps } from '@/type/bookType';
import { AniSearch } from '@/components/AniSearch';

export type MoveBookProps = {
  bookInfo: Partial<noteInfoProps>;
  open: boolean;
  closeMove: () => void;
};

export const MoveBook = ({ bookInfo, open, closeMove }: MoveBookProps) => {
  const [state] = useState({
    list: [
      {
        id: 1,
        key: '1',
        type: 'folder',
        title: '测试文件夹',
        desc: '我是测试',
        isCollect: false,
        children: [
          {
            id: 110,
            key: '12',
            type: 'folder',
            title: '测试文件夹测试测试测试',
            desc: '我是测试',
            isCollect: false,
            children: [
              {
                id: 1100,
                key: '122',
                type: 'md',
                title: '测试文件夹',
                desc: '我是测试',
                isCollect: false,
              },
              {
                id: 122,
                key: '111',
                type: 'text',
                title: '测试文件夹',
                desc: '我是测试',
                isCollect: false,
              },
            ],
          },
          {
            id: 12,
            key: '11',
            type: 'text',
            title: '测试文件夹',
            desc: '我是测试',
            isCollect: false,
          },
        ],
      },
    ] as FolderSideType['list'],
  });

  //选择移动的文件
  const onSelectFile = (
    selectedKeys: SelectKeys,
    option: SelectOptionProps,
  ) => {
    console.log(selectedKeys, option);
  };
  return (
    <AniPopup
      width={'520px'}
      onClose={closeMove}
      isDanger={false}
      title={`将 “${bookInfo.title}” 移动到...`}
      leftBtn={'新建文件夹'}
      open={open}
      okBtnName={'移动'}
      showClose={true}
    >
      <AniSearch />
      <div
        style={{
          border: '1px solid #dee0e3',
          borderRadius: '6px',
          padding: '3px',
          height: '234px',
          width: '100%',
          overflowY: 'auto',
        }}
      >
        <BookTree list={state.list} onSelect={onSelectFile} />
      </div>
    </AniPopup>
  );
};
