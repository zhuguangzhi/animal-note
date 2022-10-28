import { useSearchParam } from '@/hook/url';
import { keyConfig } from '@/common/keyConfig';
import React, { useState } from 'react';
import { BookType } from '@/type/bookType';
import './style/FolderInfoList.less';
import { useEntryBook } from '@/pages/components/util/folder';
import FolderDetail from '@/pages/components/FolderDetail';
import { IconFont } from '@/components/IconFont';
import { Tooltip } from 'antd';
import DefaultData, { EmptyDataType } from '@/components/DefaultData';
import { isValidCode } from '@/common/commonFn';
import MoreOperation from '@/pages/components/MoreOperation';
import { UseNode } from '@/components/UseNode';
import { useMounted } from '@/hook';

type FolderInfoProps = {
  list: BookType[];
  fatherInfo: BookType | null; //父文件夹的信息
};
const FolderInfo = ({
  list,
  fatherInfo,
  emptyType = 'noFile',
}: FolderInfoProps & { emptyType?: EmptyDataType }) => {
  //是否展开详情
  const [isExpand, setIsExpand] = useState(true);
  //表格还是列表
  const [isList, setIsList] = useState(true);
  //获取路由参数 通过bookid获取文件夹中的内容
  const [bookId] = useSearchParam([keyConfig.bookIdKey]);
  const [noteInfo] = useState<FolderInfoProps>({
    list: [...list],
    fatherInfo: fatherInfo ? { ...fatherInfo } : null,
  });

  useMounted(() => {
    console.log('笔记key值', bookId);
  });
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
          <UseNode rIf={!!noteInfo.fatherInfo}>
            <span>
              <IconFont
                onClick={() => setIsExpand((val) => !val)}
                className={`cursor ${
                  isExpand ? 'rotate_normal' : 'rotate_180'
                }`}
                width={'18px'}
                height={'18px'}
                marginLeft={'12px'}
                icon={'jiantouyou'}
              />
            </span>
          </UseNode>
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
          {noteInfo.list.map((book) => {
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
                  fileInfo={book}
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
          {noteInfo.list.map((book) => {
            return (
              <div
                className={'flex gridBox'}
                // style={{ width: isExpand && !!noteInfo.fatherInfo? "23%" : "17%"}}
                style={{ width: '215px' }}
                key={book.key}
                onClick={() => entryBook(book)}
              >
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
                    fileInfo={book}
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
    return (
      <div className={'flex folderInfo'}>
        {
          //无数据
          noteInfo.list.length === 0 ? (
            <DefaultData type={emptyType} />
          ) : //布局
          isList ? (
            <FolderList />
          ) : (
            <FolderGrid />
          )
        }
        <UseNode rIf={!!noteInfo.fatherInfo}>
          <FolderDetail isExpand={isExpand} />
        </UseNode>
      </div>
    );
  }
};
export default FolderInfo;
