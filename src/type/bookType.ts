import { DataNode } from 'antd/lib/tree';
import * as React from 'react';
import { codeType } from '@/common/config';

//笔记类型
export type noteInfoProps = {
  id: number;
  key: string;
  title: string;
  type: codeType;
};

export interface BookType extends DataNode {
  id: number;
  key: string; //文件或文件夹的唯一标识
  title: string;
  icon?: React.ReactNode; //节点图标
  desc?: string; //描述
  type: codeType; //文件类型
  isCollect: boolean; //是否收藏
  tagInfo?: {}; //标签信息
  children?: BookType[]; //子文件
  createTime?: string;
  updateTime?: string;
}

//主要文件类型
export type MainFileType = 'folder' | 'text' | 'code' | 'md';
export const mainFileList = ['folder', 'text', 'code', 'md'];
