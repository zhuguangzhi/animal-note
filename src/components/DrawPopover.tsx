import { Drawer, DrawerProps } from 'antd';
import { ReactNode } from 'react';

export interface DrawPopoverType extends DrawerProps {
  children: ReactNode;
}

export const DrawPopover = ({ children, ...props }: DrawPopoverType) => {
  return <Drawer {...props} width={window.innerWidth} children={children} />;
};
