import React, { useState } from 'react';
import FolderInfoList from '@/pages/components/FolderInfoList';
import { BookType } from '@/type/bookType';
const NoteBook = () => {
  const [nodeList] = useState<BookType[]>([
    {
      id: 1,
      key: '1',
      title: '测试文件夹',
      type: 'folder',
      desc: '我是测试',
      updateTime: '昨天 14：07',
      isCollect: false,
    },
    {
      id: 2,
      key: '122',
      title: '测试文件夹',
      type: 'js',
      desc: '我是测试',
      updateTime: '昨天 14：07',
      isCollect: true,
    },
    {
      id: 3,
      key: '11',
      title: '测试文件夹',
      type: 'text',
      desc: '我是测试',
      updateTime: '昨天 14：07',
      isCollect: true,
    },
    {
      id: 4,
      key: '101',
      title: '12',
      type: 'html',
      updateTime: '昨天 14：07',
      isCollect: true,
    },
    {
      id: 5,
      key: '1100',
      title: '123',
      type: 'json',
      updateTime: '昨天 14：07',
      isCollect: true,
    },
    {
      id: 6,
      key: '0311',
      title: '564',
      type: 'md',
      updateTime: '昨天 14：07',
      isCollect: true,
    },
    {
      id: 7,
      key: '112',
      title: '98',
      type: 'ts',
      updateTime: '昨天 14：07',
      isCollect: true,
    },
  ]);
  return (
    <div
      className={'flex align_start animate__animated animate__fadeIn'}
      style={{ height: '100%', width: '100%' }}
    >
      <FolderInfoList
        emptyType={'emptyFolder'}
        list={nodeList}
        fatherInfo={null}
      />
    </div>
  );
};
export default NoteBook;
