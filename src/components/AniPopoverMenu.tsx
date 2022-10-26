import { IconFont } from '@/components/IconFont';
import { Popover, PopoverProps } from 'antd';
import React from 'react';
import './styles/popoverMenu.less';
import { ModifyFileType } from '@/type/bookType';
import { UseNode } from '@/components/UseNode';
import { findKey } from '@/util';

export type MenuType = {
  label: string;
  key: string;
  icon?: string;
  children?: MenuType[];
  type?: ModifyFileType['type']; //文件的类型
};

interface PopoverMenuType extends PopoverProps {
  children: React.ReactElement;
  menuItems: MenuType[];
  defaultSelect?: MenuType['key'];
  onSelect?: (param: MenuType) => void;
}

// 多级菜单
export const AniPopoverMenu = ({
  menuItems,
  onSelect,
  children,
  defaultSelect,
  ...props
}: PopoverMenuType) => {
  //key 当前item的key值
  const computedSelect = (key: MenuType['key']) => {
    if (!defaultSelect || !key) return '';
    const selectKeyList = findKey<MenuType>(menuItems, defaultSelect);
    //当前选中的项
    if (defaultSelect === key) return 'popover-item-select';
    //    当前选中的项的父级
    else if (selectKeyList.includes(key)) return 'popover-item-father';
  };
  const moreContent = () => {
    return (
      <div className={'popoverMenu'}>
        {menuItems.map((menu) => {
          if (!menu) return false;
          if (menu.children && menu.children.length > 0) {
            //有子节点显示子节点
            return (
              <AniPopoverMenu
                key={menu.key}
                {...props}
                placement={'rightTop'}
                defaultSelect={defaultSelect}
                menuItems={menu.children}
              >
                <div
                  key={menu.key}
                  className={`popoverMenuItem ${computedSelect(menu.key)}`}
                >
                  <p className={'flex flex_align popoverMenuItemChild'}>
                    <UseNode rShow={menu.icon}>
                      <i className={'flex flex_align'}>
                        <IconFont
                          className={'popoverMenuItemIcon'}
                          icon={menu.icon}
                        />
                      </i>
                    </UseNode>
                    <span>{menu.label}</span>
                  </p>
                  <IconFont
                    width={'10px'}
                    height={'10px'}
                    className={'popoverMenuItemIcon popoverMenuItemArrow'}
                    icon={'jiantouyou'}
                  />
                </div>
              </AniPopoverMenu>
            );
          }
          return (
            <div
              key={menu.key}
              className={`popoverMenuItem ${computedSelect(menu.key)}`}
              onClick={() => onSelect?.(menu)}
            >
              <UseNode rShow={menu.icon}>
                <i className={'flex flex_align'}>
                  <IconFont
                    className={'popoverMenuItemIcon'}
                    icon={menu.icon}
                  />
                </i>
              </UseNode>
              <span>{menu.label}</span>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <Popover
      {...props}
      content={moreContent}
      arrowPointAtCenter={true}
      children={children}
    />
  );
};
