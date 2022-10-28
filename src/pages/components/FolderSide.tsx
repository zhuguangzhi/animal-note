import { BookType } from '@/type/bookType';
import './style/FolderSide.less';
import { TreeProps } from 'antd';
import { useMounted } from '@/hook';
import { IconFont } from '@/components/IconFont';
import React, { useEffect, useState } from 'react';
import { Resizable } from 're-resizable';
import { useSearchParam } from '@/hook/url';
import { keyConfig } from '@/common/keyConfig';
import { useEntryBook } from '@/pages/components/util/folder';
import { isValidCode } from '@/common/commonFn';
import { BookTree } from '@/components/BookTree';
import { UseNode } from '@/components/UseNode';

export default ({ width, list }: { width: number; list: BookType[] }) => {
  const { bookIdKey } = keyConfig;
  const [bookKey] = useSearchParam([bookIdKey]);
  //默认选中的节点
  let [treeDefaultKey, setTreeDefaultKey] = useState<string[]>([]);
  useEffect(() => {
    setTreeDefaultKey([bookKey[bookIdKey]]);
  }, [bookKey[bookIdKey]]);
  //list数据处理 处理图标
  useMounted(() => {
    //节点图标处理
    (function setIcon(array: BookType[]) {
      array.forEach((item) => {
        item.icon = <IconFont icon={isValidCode(item.type)} />;
        if (item.children) setIcon(item.children);
      });
    })(list);
    //  没有值时默认选中第一个
    if (!bookKey[bookIdKey]) setTreeDefaultKey([list[0].key]);
  });

  const entryBook = useEntryBook();

  //节点拖拽
  const onDrop: TreeProps['onDrop'] = (e) => {
    console.log('drop', e);
  };
  return (
    <Resizable
      className={'folderSide'}
      defaultSize={{ width: width, height: '100%' }}
      maxWidth={width + 100}
      minHeight={'100%'}
      minWidth={width}
    >
      <UseNode rIf={treeDefaultKey.length > 0}>
        <BookTree
          list={list}
          selectedKeys={treeDefaultKey}
          autoExpandParent={true}
          defaultExpandParent={true}
          defaultExpandedKeys={treeDefaultKey}
          onDrop={onDrop}
          draggable={{ icon: false }}
          onSelect={(selectedKeys, info) =>
            entryBook(info.node as Partial<BookType>)
          }
        />
      </UseNode>
    </Resizable>
  );
};
