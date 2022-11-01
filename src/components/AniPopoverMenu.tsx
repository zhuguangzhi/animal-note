import { IconFont } from '@/components/IconFont';
import { Popover, PopoverProps } from 'antd';
import React, { useState } from 'react';
import './styles/popoverMenu.less';
import { UseNode } from '@/components/UseNode';
import { findKey } from '@/util';

export type MenuType = {
  label: string;
  key: string;
  icon?: string;
  children?: MenuType[];
  type?: 'Folder' | 'File' | 'Code'; //文件的类型
};

interface PopoverMenuType extends PopoverProps {
  children: React.ReactElement;
  menuItems: MenuType[];
  defaultSelect?: MenuType['key'];
  onSelect?: (param: MenuType) => void;
  autoMenu?: React.ReactElement | null;
}

// 多级菜单
export const AniPopoverMenu = (props: PopoverMenuType) => {
  const [openPopover, setOpenPopover] = useState({});

  const Menu = ({
    menuItems,
    onSelect,
    children,
    autoMenu,
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

    const selectMenu = (menu: MenuType) => {
      onSelect?.(menu);
      // 关闭弹窗
      setOpenPopover({
        open: false,
      });
      // 删除控制
      setOpenPopover({});
    };

    const moreContent = () => {
      return autoMenu ? (
        autoMenu
      ) : (
        <div className={'popoverMenu'}>
          {menuItems.map((menu) => {
            if (!menu) return false;
            if (menu.children && menu.children.length > 0) {
              //有子节点显示子节点
              return (
                <Menu
                  key={menu.key}
                  {...props}
                  onSelect={onSelect}
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
                </Menu>
              );
            }
            return (
              <div
                key={menu.key}
                className={`popoverMenuItem ${computedSelect(menu.key)}`}
                onClick={() => selectMenu(menu)}
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
        {...Object.assign(openPopover, props)}
        content={moreContent}
        arrowPointAtCenter={true}
        children={children}
        destroyTooltipOnHide={true}
      />
    );
  };
  return <Menu {...props} />;
};
