import { IconFont } from '@/components/IconFont';
import style from './index.less';
import { Outlet } from '@umijs/max';
import React, { useState } from 'react';
import { Form, Tooltip } from 'antd';
import router, { useGetUrlPath } from '@/hook/url';
import { AniPopoverMenu, MenuType } from '@/components/AniPopoverMenu';
import { ModifyFileType } from '@/type/bookType';
import ModifyFolder from '@/pages/components/ModifyFile';

interface sideBarType {
  key: string;
  icon: string;
  desc: string;
  type?: ModifyFileType['type']; //文件的类型
  menu?: MenuType[]; //子菜单弹出
}

export default () => {
  //获取当前路径
  const currentRootPath = useGetUrlPath()[1];
  const IconStyle: React.CSSProperties = {
    width: '22px',
    height: '22px',
  };

  const [form] = Form.useForm();
  //新增文件或文件夹
  const [addFileInfo, setAddFileInfo] = useState({
    type: 'Folder' as ModifyFileType['type'],
    visible: false as boolean,
    title: '' as string,
  });

  //侧边按钮列表
  const SideBarList: sideBarType[] = [
    {
      key: 'mine',
      icon: 'user',
      desc: '我的',
    },
    {
      key: 'note',
      icon: 'plus',
      desc: '创建',
      menu: [
        {
          label: '新建笔记簿',
          key: 'folder',
          icon: 'addFolder',
          type: 'Folder',
        },
        {
          label: '新建文本文件',
          key: 'text',
          icon: 'text',
          type: 'File',
        },
        {
          label: '新建Markdown文件',
          key: 'md',
          icon: 'md',
          type: 'File',
        },
        {
          label: '新建代码文件',
          key: 'code',
          icon: 'code',
          type: 'Code',
        },
      ],
    },
    // {
    //     key: 2,
    //     icon: "search",
    //     desc: "搜索"
    // },
    {
      key: 'noteBook',
      icon: 'notes',
      desc: '笔记簿',
    },
    {
      key: 'collect',
      icon: 'file-focus-one',
      desc: '收藏夹',
    },
    {
      key: 'sign',
      icon: 'bookmark-one',
      desc: '标签',
    },
  ];
  //路由跳转
  const changeBar = (key: string, params = {}) => {
    // coverParams({[keyConfig.sideTypeKey]: key})
    if (currentRootPath !== key) router.push(`/${key}`, params);
  };
  //新建的类型
  const addType = (option: MenuType) => {
    setAddFileInfo(() => ({
      type: option.type as ModifyFileType['type'],
      visible: true,
      title: option.label,
    }));
  };
  //新建
  const addFile = async () => {
    //校验失败会阻止向下运行
    await form.validateFields();
    console.log('9999999999');
    // if (option.key !== "folder")
    //     return changeBar('addNote', {type: option.key})
  };

  //默认显示节点
  const DefaultComponent = ({ bar }: { bar: sideBarType }) => {
    return (
      <Tooltip placement="right" title={bar.desc}>
        <div
          onClick={() => changeBar(bar.key)}
          className={`${style.SideBarItem} ${
            currentRootPath === bar.key ? style.SideBarChoseBar : ''
          }`}
        >
          <IconFont {...IconStyle} icon={bar.icon} />
        </div>
      </Tooltip>
    );
  };
  //有子节点的节点
  const MenuNodeComponent = ({ bar }: { bar: sideBarType }) => {
    return (
      <AniPopoverMenu
        trigger={'click'}
        placement="rightTop"
        menuItems={bar.menu as MenuType[]}
        onSelect={addType}
      >
        <div
          className={`${style.SideBarItem} ${
            currentRootPath === bar.key ? style.SideBarChoseBar : ''
          }`}
        >
          <IconFont {...IconStyle} icon={bar.icon} />
        </div>
      </AniPopoverMenu>
    );
  };

  // useMounted(()=>{
  //     router.beforeEach(({from,to,next}:beforeEachEvents)=>{
  //         console.log(from,to)
  //         next()
  //     })
  // })

  return (
    <div className={style.Side}>
      <div className={style.SideBar}>
        {SideBarList.map((bar) => {
          return !bar.menu ? (
            <DefaultComponent bar={bar} key={bar.key} />
          ) : (
            <MenuNodeComponent bar={bar} key={bar.key} />
          );
        })}
      </div>
      {/*中间主体*/}
      <div className={style.SideBarContainer}>
        <Outlet />
      </div>
      {/*新建*/}
      <ModifyFolder
        title={addFileInfo.title}
        form={form}
        type={addFileInfo.type}
        visible={addFileInfo.visible}
        onCancel={() => {
          setAddFileInfo({ ...addFileInfo, visible: false });
        }}
        onOk={addFile}
      />
    </div>
  );
};
