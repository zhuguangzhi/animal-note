// 全局变量控制
import { useState } from 'react';

export const useSideBar = () => {
  const [sideBarChoose, setSideBar] = useState<string | number>('mine');
  return [sideBarChoose, setSideBar] as const;
};
export default {
  NodeName: 'Animal Note',
};
