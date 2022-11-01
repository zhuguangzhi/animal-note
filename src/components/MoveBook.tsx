import { AniPopup } from '@/components/AniPopup';
import React, { useCallback, useState } from 'react';
import { BookTree, SelectKeys, SelectOptionProps } from '@/components/BookTree';
import { BookType, noteInfoProps } from '@/type/bookType';
import { AniSearch } from '@/components/AniSearch';
import { connect, Dispatch } from 'umi';

export type MoveBookProps = {
  bookInfo?: Partial<noteInfoProps>;
  open: boolean;
  closeMove: () => void;
  dispatch: Dispatch;
};

const MoveBook = ({ bookInfo, open, closeMove, dispatch }: MoveBookProps) => {
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
  //新建文件夹
  const addFolder = () => {
    dispatch({
      type: 'editFilePopup/openPopup',
      payload: {
        title: `新增到 ${
          currentFileInfo ? '"' + currentFileInfo.title + '"' : '根目录'
        }`,
        type: 'Folder',
      },
    });
  };
  return (
    <AniPopup
      width={'520px'}
      onClose={closeMove}
      isDanger={false}
      title={`将 “${bookInfo?.title}” 移动到...`}
      leftBtn={'新建文件夹'}
      onLeftEvent={addFolder}
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
        <BookTree list={list} onSelect={onSelectFile} />
      </div>
    </AniPopup>
  );
};
export default connect()(MoveBook);
