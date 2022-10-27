import { useSearchParam } from '@/hook/url';
import { keyConfig } from '@/common/keyConfig';
import React, { useState } from 'react';
import { BookType } from '@/type/bookType';
import './style/FolderInfoList.less';
import { useEntryBook } from '@/pages/components/util/folder';
import FolderDetail from '@/pages/components/FolderDetail';
import { IconFont } from '@/components/IconFont';
import { Tooltip } from 'antd';
import DefaultData from '@/components/DefaultData';
import { isValidCode } from '@/common/commonFn';
import MoreOperation from '@/pages/components/MoreOperation';

const FolderInfo = () => {
  //是否展开详情
  const [isExpand, setIsExpand] = useState(true);
  //表格还是列表
  const [isList, setIsList] = useState(true);
  //获取路由参数 通过bookid获取文件夹中的内容
  const [bookId] = useSearchParam([keyConfig.bookIdKey]);
  const [bookData] = useState<BookType[]>([
    {
      id: 1,
      key: '10',
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
  const entryBook = useEntryBook();

  //信息头
  const Header = () => {
    return (
      <div
        className={'listLine flex flex_align'}
        style={{ border: isList ? '' : 'none' }}
      >
        <div className={'font_14 listLineItem '} style={{ flex: 1 }}>
          <span className={'cursor'}>名称</span>
          <IconFont className={'icon cursor'} icon={'jiantouxia'} />
        </div>
        <div
          className={'font_14 listLineItem listLineInfo cursor'}
          style={{ opacity: isList ? 1 : 0 }}
        >
          <span>修改时间</span>
          <IconFont className={'icon'} icon={'jiantouxia'} />
        </div>
        <div className={'font_20 listLineItem listLineInfo flex flex_justify'}>
          <IconFont
            className={'cursor'}
            width={'18px'}
            height={'18px'}
            icon={isList ? 'icon-test' : 'liebiao'}
            onClick={() => setIsList((val) => !val)}
          />
          <IconFont
            onClick={() => setIsExpand((val) => !val)}
            className={`cursor ${isExpand ? 'rotate_normal' : 'rotate_180'}`}
            width={'18px'}
            height={'18px'}
            marginLeft={'12px'}
            icon={'jiantouyou'}
          />
        </div>
      </div>
    );
  };

  //列表布局
  const FolderList = () => {
    return (
      <div className={'list'}>
        <Header />
        <>
          {bookData.map((book) => {
            return (
              <div
                className={'listLine cursor flex flex_align'}
                key={book.id}
                onClick={() => entryBook(book)}
              >
                <div className={'font_14 listLineItem'} style={{ flex: 1 }}>
                  <IconFont
                    className={'iconFont'}
                    icon={isValidCode(book.type)}
                  />
                  <span className={'cursor'}>{book.title}</span>
                </div>
                <div className={'font_14 listLineItem listLineInfo'}>
                  <span>{book.updateTime}</span>
                </div>
                <MoreOperation
                  fileKey={book.key}
                  type={book.type}
                  className={'listLineItem listLineInfo'}
                  placement={'rightBottom'}
                />
              </div>
            );
          })}
        </>
      </div>
    );
  };
  //九宫格布局
  const FolderGrid = () => {
    return (
      <div className={'grid'}>
        <Header />
        <div className={'flex'} style={{ width: '100%', flexWrap: 'wrap' }}>
          {bookData.map((book) => {
            return (
              <div className={'flex gridBox'} key={book.key}>
                <div className={'gridBoxImage'}>
                  <IconFont
                    width={'60px'}
                    height={'60px'}
                    icon={
                      ['folder', 'md', 'text'].includes(book.type)
                        ? `${book.type}-file`
                        : 'code-file'
                    }
                  />
                </div>
                <div className={'flex gridBoxContainer'}>
                  <IconFont
                    width={'24px'}
                    height={'24px'}
                    marginRight={'8px'}
                    icon={isValidCode(book.type)}
                  />
                  <div className={'textOverflow'} style={{ flex: 1 }}>
                    <p className={'font_14'}>{book.title}</p>
                    <Tooltip
                      color={'#FFFFFF'}
                      overlayInnerStyle={{ color: '#333333', fontSize: '14px' }}
                      placement="bottom"
                      title={`最后更新于 ${book.updateTime}`}
                    >
                      <p className={'font_12'}>最后更新于 {book.updateTime}</p>
                    </Tooltip>
                  </div>
                  <MoreOperation
                    fileKey={book.key}
                    type={book.type}
                    placement={'left'}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  {
    if (!bookId[keyConfig.bookIdKey]) return <></>;
    return (
      <div className={'flex folderInfo'}>
        {
          //无数据
          bookData.length === 0 ? (
            <DefaultData type={'noFile'} />
          ) : //布局
          isList ? (
            <FolderList />
          ) : (
            <FolderGrid />
          )
        }
        <FolderDetail isExpand={isExpand} />
      </div>
    );
  }
};
export default FolderInfo;
