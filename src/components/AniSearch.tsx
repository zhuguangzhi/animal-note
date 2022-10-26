import { Input, InputProps } from 'antd';
import React, { useState } from 'react';
import { IconFont } from '@/components/IconFont';
import { AniList, AniListProps } from '@/components/AniList';
import { UseNode } from '@/components/UseNode';
import { inputEvent } from '@/components/AniInput';
import './styles/aniSearch.less';
import { useSetState } from '@/util';

const SearchIcon = () => <IconFont icon={'fenxiang'} />;

export interface AniSearchProps extends InputProps {
  style?: React.CSSProperties;
  className?: string;
}

export const AniSearch = ({ ...props }: AniSearchProps) => {
  const [state, setState] = useState({
    searchValue: '', //搜索框输入的内容
    searchList: [
      { id: 1, key: '12', content: 'lalal', iconName: 'folder' },
      { id: 2, key: '11', content: 'ts.ts', iconName: 'ts' },
    ] as AniListProps[], //搜索结果
    searchHistory: [
      { id: 1, content: '数据结构', iconName: 'shijian' },
      { id: 2, content: '软件设计师', iconName: 'shijian' },
      { id: 3, content: '离散数学', iconName: 'shijian' },
    ] as AniListProps[], //搜索历史
    recentlyRead: [
      { id: 1, key: '12', content: 'lalal', iconName: 'folder' },
      { id: 2, key: '11', content: 'ts.ts', iconName: 'ts' },
    ] as AniListProps[], //最近阅读
    openSearch: false, //是否打开search
  });
  const changeState = useSetState(state, setState);

  const onSearch = (e: inputEvent) => {
    // console.log(e, searchValue.current, !!searchValue.current)
    changeState({ searchValue: e.target.value });
  };

  //search控制
  const searchBtn = () => {
    changeState({ openSearch: !state.openSearch });
  };

  //搜索内容
  const SearchData = () => {
    return state.searchList.length > 0 ? (
      <AniList list={state.searchList} />
    ) : (
      <p style={{ padding: '16px 8px' }}>
        没有找到匹配的结果，尝试其他关键词进行搜索
      </p>
    );
  };
  //默认展示内容
  const DefaultData = () => {
    return (
      <div>
        {/*搜索历史*/}
        <UseNode rIf={state.searchList.length > 0}>
          <div>
            <p className={'SearchTitle'}>搜索历史</p>
            <AniList list={state.searchHistory} />
          </div>
        </UseNode>
        {/*    最近浏览*/}
        <UseNode rIf={state.recentlyRead.length > 0}>
          <div>
            <p className={'SearchTitle'}>最近浏览</p>
            <AniList list={state.recentlyRead} />
          </div>
        </UseNode>
      </div>
    );
  };
  return (
    <div style={props.style} className={`${props.className} AniSearch`}>
      <Input
        autoComplete="off"
        style={{ marginBottom: '12px' }}
        placeholder="搜索"
        {...props}
        onFocus={searchBtn}
        onBlur={searchBtn}
        prefix={<SearchIcon />}
        onChange={onSearch}
      />
      {/*索索内容展示区*/}
      <UseNode rIf={state.openSearch}>
        <div className={'AniSearch_Result'}>
          {!!state.searchValue ? <SearchData /> : <DefaultData />}
        </div>
      </UseNode>
    </div>
  );
};
