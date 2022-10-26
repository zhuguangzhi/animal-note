import './style/FolderDetail.less';
import { useState } from 'react';
import { BookType } from '@/type/bookType';
import { IconFont } from '@/components/IconFont';
import ModifyFolder from '@/pages/components/ModifyFile';
import { Form } from 'antd';
import { useMounted } from '@/hook';
import { AniPopoverMenu, MenuType } from '@/components/AniPopoverMenu';

export default ({ isExpand }: { isExpand: boolean }) => {
  let [folderInfo, setFolderInfo] = useState<BookType>({
    type: 'folder',
    title: '测试文件夹',
    id: 1,
    key: '1',
    desc: '测试文件夹',
    isCollect: true,
    createTime: '昨天 12:08',
  });
  const [form] = Form.useForm();
  //编辑开关
  const [edit, setEdit] = useState(false);
  const changeEdit = () => {
    setEdit((val) => !val);
  };
  //修改文件夹名称 描述信息
  const confirmEdit = () => {
    console.log(form.getFieldsValue());
  };
  //收藏&取消收藏
  const changeCollect = () => {
    setFolderInfo({
      ...folderInfo,
      isCollect: !folderInfo.isCollect,
    });
  };

  //popover菜单项
  const menuItems: MenuType[] = [
    {
      label: '新建',
      key: 'add',
      icon: 'addFolder',
      children: [
        {
          label: '新建文件夹',
          key: 'addFolder',
          icon: 'addFolder',
        },
        {
          label: '新建文本文件',
          key: 'addText',
          icon: 'text',
        },
        {
          label: '新建Markdown文件',
          key: 'addMd',
          icon: 'md',
        },
        {
          label: '新建代码文件',
          key: 'addCode',
          icon: 'code',
        },
      ],
    },
    {
      label: '移动到',
      key: 'moveFolder',
      icon: 'moveFolder',
    },
    {
      label: '标签',
      key: 'moveSign',
      icon: 'moveSign',
    },
    {
      label: '删除文件夹',
      key: 'delFolder',
      icon: 'delFolder',
    },
  ];
  //改变更多
  const choseMore = (option: MenuType) => {
    console.log('option', option);
  };

  useMounted(() => {
    if (form)
      form.setFields([
        { name: 'title', value: folderInfo.title },
        { name: 'desc', value: folderInfo.desc },
      ]);
  });
  return (
    <div
      className={`folderDetail ${
        isExpand ? 'folderDetail-entry' : 'folderDetail-leave'
      }`}
    >
      {/*标题*/}
      <div className={'folderDetailTitle justify_between flex_align'}>
        <span className={'font_16'}>{folderInfo.title}</span>
        <i className={'flex'}>
          <IconFont
            onClick={changeEdit}
            className={'iconMore'}
            icon={'bianjishuru-xianxing'}
          />
          <IconFont
            onClick={changeCollect}
            className={'iconMore'}
            icon={folderInfo.isCollect ? 'collect-true' : 'collect'}
          />
          <AniPopoverMenu
            placement="bottomLeft"
            menuItems={menuItems}
            onSelect={choseMore}
          >
            <i>
              <IconFont className={'iconMore'} icon={'gengduo'} />
            </i>
          </AniPopoverMenu>
        </i>
      </div>
      {/*中间图片*/}
      <div className={'folderDetailImage'}>
        <IconFont width={'80px'} height={'80px'} icon={folderInfo.type} />
      </div>
      <button className={'folderDetailButton'}>
        <IconFont
          width={'18px'}
          height={'18px'}
          marginRight={'8px'}
          icon={'share-three-6lj6c18c'}
        />
        <span className={'font_16'}>分享</span>
      </button>
      {/*描述等列表*/}
      <div className={'folderDetailInfo'}>
        <div
          className={'font_14 folderDetailInfoItem'}
          style={{ display: folderInfo.desc ? 'block' : 'none' }}
        >
          <p className={'color_646A'}>描述</p>
          <p className={'color_33'}>{folderInfo.desc}</p>
        </div>
        <div className={'font_14 folderDetailInfoItem'}>
          <p className={'color_646A'}>所在标签</p>
          <p className={'color_33'}>我是标签</p>
        </div>
        <div className={'font_14 folderDetailInfoItem'}>
          <p className={'color_646A'}>创建时间</p>
          <p className={'color_33'}>{folderInfo.createTime}</p>
        </div>
      </div>
      <ModifyFolder
        title={'编辑信息'}
        form={form}
        type={'Folder'}
        visible={edit}
        onCancel={changeEdit}
        onOk={confirmEdit}
      />
    </div>
  );
};
