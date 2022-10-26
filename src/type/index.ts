import { MenuItemProps } from 'antd';

export interface menuItemProps extends MenuItemProps {
  key: number;
  label: string;
}
