import { CaretDownFilled } from '@ant-design/icons';
import { FolderSideType } from '@/type/bookType';
import { Tree, TreeProps } from 'antd';
import React from 'react';
import { DataNode, EventDataNode } from 'antd/lib/tree';
import { Key } from 'antd/lib/table/interface';

export interface BookTreeProps extends TreeProps {
  list: FolderSideType['list'];
}

export type SelectKeys = Key[];
export type SelectOptionProps = {
  event: 'select';
  selected: boolean;
  node: EventDataNode<DataNode>;
  selectedNodes: DataNode[];
  nativeEvent: MouseEvent;
};

export const BookTree = ({ list, ...props }: BookTreeProps) => {
  return (
    <Tree
      // rootClassName={"tree"}
      showIcon={true}
      switcherIcon={<CaretDownFilled />}
      treeData={list}
      {...props}
      // onDrop={onDrop}
    />
  );
};
