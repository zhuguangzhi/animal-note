import { Drawer, DrawerProps } from 'antd';
import React, { ReactElement } from 'react';

interface EpicType extends DrawerProps {
  children: ReactElement;
}

export default ({ children, visible, onClose, ...props }: EpicType) => {
  return (
    <Drawer
      className={'flex flex_align flex_justify'}
      visible={visible}
      onClose={onClose}
      {...props}
      forceRender={true}
      destroyOnClose={true}
      width={'100%'}
      children={children}
    />
  );
};
