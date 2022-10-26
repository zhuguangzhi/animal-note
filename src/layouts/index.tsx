import { Outlet } from 'umi';
import './base.less';
import './common.less';
import 'animate.css';
import ModifyFolder from '@/pages/components/ModifyFile';
import React from 'react';

export default function Layout() {
  return (
    <div className="layout">
      <Outlet />
      {/*新建*/}
      <ModifyFolder />
    </div>
  );
}
