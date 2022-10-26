import { DataNode } from 'antd/lib/tree';
import * as React from 'react';
import { FormInstance, ModalProps } from 'antd';
import { codeType } from '@/common/config';

//笔记类型
export type noteInfoProps = {
  id: number;
  key: string;
  title: string;
};

export interface BookType extends DataNode {
  id: number;
  key: string; //文件或文件夹的唯一标识
  title: string;
  icon?: React.ReactNode; //节点图标
  desc?: string; //描述
  type: codeType; //文件类型
  isCollect: boolean; //是否收藏
  signInfo?: {}; //标签信息
  children?: BookType[]; //子文件
  createTime?: string;
  updateTime?: string;
}

//文件夹侧边栏
export interface FolderSideType {
  list: BookType[];
  width: number; //类型rem 1rem=1px
}

// 新建、修改弹窗
export interface ModifyFileType extends ModalProps {
  id?: number; //需要修改的文件/夹id
  key?: string; //需要修改的文件/夹key
  form: FormInstance; //form表单
  type: 'Folder' | 'File' | 'Code'; //文件夹|文件
}

//主要文件类型
export type MainFileType = 'folder' | 'text' | 'code' | 'md';
export const mainFileList = ['folder', 'text', 'code', 'md'];
