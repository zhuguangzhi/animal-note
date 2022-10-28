import FolderSide from '@/pages/components/FolderSide';
import React, { useState } from 'react';
import FolderInfoList from '@/pages/components/FolderInfoList';
import './style/noteBook.less';
import { BookType } from '@/type/bookType';

const NoteBook = () => {
  const [folderList] = useState({
    fatherInfo: {
      type: 'folder',
      title: '测试文件夹',
      id: 1,
      key: '1',
      desc: '测试文件夹',
      isCollect: true,
      createTime: '昨天 12:08',
    } as BookType | null,
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
    ] as BookType[],
  });
  return (
    <div
      className={'flex align_start noteBook animate__animated animate__fadeIn'}
    >
      <FolderSide width={200} list={folderList.list} />
      <FolderInfoList
        list={folderList.list[0].children || []}
        fatherInfo={folderList.fatherInfo}
      />
    </div>
  );
};
export default NoteBook;
