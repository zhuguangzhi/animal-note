import { UseNode } from '@/components/UseNode';
import { IconFont } from '@/components/IconFont';
import './styles/aniList.less';
import React, { Fragment, ReactNode } from 'react';

export interface AniListProps {
  id: number;
  key?: string;
  iconName?: string;
  content: string;
  subContent?: ReactNode;
}

export const AniList = ({
  list,
  onClick,
}: {
  list: AniListProps[];
  onClick?: (option: AniListProps) => void;
}) => {
  return (
    <div>
      {list.map((item) => {
        return (
          <div className={'aniList'} key={item.id}>
            {/*图标*/}
            <UseNode rIf={item.iconName}>
              <i className={'flex align-center'}>
                <IconFont className={'aniList_Icon'} icon={item.iconName} />
              </i>
            </UseNode>
            {/*内容*/}
            <div className={'aniList_Content'} onClick={() => onClick?.(item)}>
              <p>{item.content}</p>
              <UseNode rIf={item.subContent}>
                <Fragment children={item.subContent} />
              </UseNode>
            </div>
          </div>
        );
      })}
    </div>
  );
};
