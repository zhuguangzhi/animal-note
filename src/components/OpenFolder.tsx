import { MoveBookProps } from '@/components/MoveBook';
import React, { useCallback, useState } from 'react';
import { BookTree, SelectKeys, SelectOptionProps } from '@/components/BookTree';
import { AniSearch } from '@/components/AniSearch';
import AniPopup from '@/components/AniPopup';
import { BookType } from '@/type/bookType';

export const OpenFolder = ({
  bookInfo,
  open,
  closeMove,
}: Omit<MoveBookProps, 'dispatch'>) => {
  const [list] = useState<BookType[]>([
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
  ]);
  const [currentFileInfo, setCurrent] = useState<
    MoveBookProps['bookInfo'] | null
  >(null);

  //选择移动的文件
  const onSelectFile = useCallback(
    (selectedKeys: SelectKeys, option: SelectOptionProps) => {
      setCurrent(
        selectedKeys.length > 0
          ? (option.selectedNodes[0] as MoveBookProps['bookInfo'])
          : null,
      );
    },
    [],
  );
  //打开文件
  const openFile = () => {
    console.log(currentFileInfo, bookInfo);
  };
  return (
    <AniPopup
      width={'520px'}
      onClose={closeMove}
      title={`打开笔记`}
      open={open}
      okBtnName={'打开'}
      showClose={true}
      onOk={openFile}
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
        <BookTree
          list={list}
          onSelect={onSelectFile}
          autoExpandParent={true}
          defaultExpandParent={true}
          defaultSelectedKeys={[bookInfo.key || '']}
          defaultExpandedKeys={[bookInfo.key || '']}
        />
      </div>
    </AniPopup>
  );
};
