import { useSearchParam } from '@/hook/url';
import { keyConfig } from '@/common/keyConfig';
import React, { useState } from 'react';
import { BookType } from '@/type/bookType';
import './style/FolderInfoList.less';
import '@/components/styles/popoverMenu.less';
import { useEntryBook } from '@/pages/components/util/folder';
import FolderDetail from '@/pages/components/FolderDetail';
import { IconFont } from '@/components/IconFont';
import { Tooltip } from 'antd';
import DefaultData, { EmptyDataType } from '@/components/DefaultData';
import { isValidCode } from '@/common/commonFn';
import MoreOperation from '@/pages/components/MoreOperation';
import { UseNode } from '@/components/UseNode';
import { useMounted } from '@/hook';
import { AniPopoverMenu, MenuType } from '@/components/AniPopoverMenu';
import { useSetState } from '@/util';

type FolderInfoProps = {
  list: BookType[];
  fatherInfo: BookType | null; //父文件夹的信息
};
const FolderInfo = ({
  list,
  fatherInfo,
  emptyType = 'noFile',
}: FolderInfoProps & { emptyType?: EmptyDataType }) => {
  const [state, setState] = useState({
    isExpand: true, //是否展开详情
    isList: true, //表格还是列表
    currentSlotType: null as string | null, //当前排序方式
    noteInfo: {
      list: [...list],
      fatherInfo: fatherInfo ? { ...fatherInfo } : null,
    } as FolderInfoProps,
    timeSLotList: [
      { key: 'ascTime', label: '时间从近到远' },
      { key: 'descTime', label: '时间从远到近' },
    ] as MenuType[], //时间排序
    timeShowType: 'updateTime' as 'createTime' | 'updateTime', //展示时间的排序方式
  });
  const changeState = useSetState(state, setState);
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

  //排序
  const SlotEvent = (option: MenuType) => {
    if (option.key === state.currentSlotType)
      changeState({ currentSlotType: null });
    else changeState({ currentSlotType: option.key });
    console.log(option);
  };

  //时间展示
  const TimeSlot = () => {
    return (
      <div className={'TimeSlot'}>
        <p className={'font_12 color_646A TimeSlotDesc'}>展示</p>
        <div>
          <p
            className={`TimeSlotItem ${
              state.timeShowType === 'updateTime' ? 'popover-item-select' : ''
            }`}
            onClick={() => {
              changeState({ timeShowType: 'updateTime' });
            }}
          >
            更新时间
          </p>
          <p
            className={`TimeSlotItem ${
              state.timeShowType === 'createTime' ? 'popover-item-select' : ''
            }`}
            onClick={() => {
              changeState({ timeShowType: 'createTime' });
            }}
          >
            创建时间
          </p>
        </div>
        <hr style={{ margin: '6px 0' }} />
        <p className={'font_12 color_646A TimeSlotDesc'}>排序</p>
        <div>
          {state.timeSLotList.map((item) => {
            return (
              <p
                className={`TimeSlotItem ${
                  state.currentSlotType === item.key
                    ? 'popover-item-select'
                    : ''
                }`}
                key={item.key}
                onClick={() => SlotEvent(item)}
              >
                {item.label}
              </p>
            );
          })}
        </div>
      </div>
    );
  };

  //信息头
  const Header = () => {
    return (
      <div
        id={'folderInfoHeader'}
        className={'listLine flex flex_align'}
        style={{ border: state.isList ? '' : 'none' }}
      >
        <div className={'font_14 listLineItem '} style={{ flex: 1 }}>
          <AniPopoverMenu
            trigger={'click'}
            placement={'bottom'}
            menuItems={[
              { label: '名称（A->Z）', key: 'ascOrder' },
              { label: '名称（Z->A）', key: 'descOrder' },
            ]}
            onSelect={SlotEvent}
            defaultSelect={state.currentSlotType || ''}
          >
            <p style={{ height: '19px' }} className={'flex flex_align'}>
              <span className={'cursor'}>名称</span>
              <IconFont className={'icon cursor'} icon={'jiantouxia'} />
            </p>
          </AniPopoverMenu>
        </div>
        <div
          className={'font_14 listLineItem listLineInfo cursor'}
          style={{ opacity: state.isList ? 1 : 0 }}
        >
          <AniPopoverMenu
            menuItems={[]}
            trigger="click"
            placement={'bottom'}
            autoMenu={<TimeSlot />}
          >
            <p
              style={{ height: '19px', userSelect: 'none' }}
              className={'flex flex_align'}
            >
              <span>
                {state.timeShowType === 'createTime' ? '创建时间' : '更新时间'}
              </span>
              <IconFont className={'icon'} icon={'jiantouxia'} />
            </p>
          </AniPopoverMenu>
        </div>
        <div className={'font_20 listLineItem listLineInfo flex flex_justify'}>
          <IconFont
            className={'cursor'}
            width={'18px'}
            height={'18px'}
            icon={state.isList ? 'icon-test' : 'liebiao'}
            onClick={() => changeState({ isList: !state.isList })}
          />
          <UseNode rIf={!!noteInfo.fatherInfo}>
            <span>
              <IconFont
                onClick={() => changeState({ isExpand: state.isExpand })}
                className={`cursor ${
                  state.isExpand ? 'rotate_normal' : 'rotate_180'
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
                  <span>{book[state.timeShowType]}</span>
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
                      title={`最后更新于 ${book[state.timeShowType]}`}
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
          state.isList ? (
            <FolderList />
          ) : (
            <FolderGrid />
          )
        }
        <UseNode rIf={!!noteInfo.fatherInfo}>
          <FolderDetail isExpand={state.isExpand} />
        </UseNode>
      </div>
    );
  }
};
export default FolderInfo;
