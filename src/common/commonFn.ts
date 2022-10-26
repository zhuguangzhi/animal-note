import React from 'react';
import { MenuProps } from 'antd';
import { codeValue } from '@/common/config';

export type MenuItemType = Required<MenuProps>['items'][number];

export const getMenuItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItemType[],
  type?: 'group',
): MenuItemType => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItemType;
};

//判断当前文件的后缀是否在文件列表中
export const isValidCode = (code: string) => {
  if (codeValue.includes(code)) return code;
  return 'code';
};
