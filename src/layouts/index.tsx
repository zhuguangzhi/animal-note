import { Outlet } from 'umi';
import './base.less';
import './common.less';
import 'animate.css';

export default function Layout() {
  return (
    <div className="layout">
      <Outlet />
    </div>
  );
}
