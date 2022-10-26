import FolderSide from '@/pages/components/FolderSide';
import React, { useState } from 'react';
import { FolderSideType } from '@/type/bookType';
import FolderInfoList from '@/pages/components/FolderInfoList';
import './style/noteBook.less';

const NoteBook = () => {
  const [FolderList] = useState<FolderSideType>({
    width: 200,
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
    ],
  });
  return (
    <div
      className={'flex align_start noteBook animate__animated animate__fadeIn'}
      style={{ height: '100%', width: '100%' }}
    >
      <FolderSide {...FolderList} />
      <FolderInfoList />
    </div>
  );
};
export default NoteBook;
