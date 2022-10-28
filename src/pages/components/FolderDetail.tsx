import './style/FolderDetail.less';
import { useState } from 'react';
import { BookType } from '@/type/bookType';
import { IconFont } from '@/components/IconFont';
import { connect, Dispatch } from 'umi';
import { editFileState } from '@/models/editFilePopup';
import MoreOperation from '@/pages/components/MoreOperation';

const FolderDetail = ({
  isExpand,
  dispatch,
}: {
  isExpand: boolean;
  dispatch: Dispatch;
}) => {
  const [folderInfo, setFolderInfo] = useState<BookType>({
    type: 'folder',
    title: '测试文件夹',
    id: 1,
    key: '1',
    desc: '测试文件夹',
    isCollect: true,
    createTime: '昨天 12:08',
  });
  const changeEdit = () => {
    dispatch({
      type: 'editFilePopup/openPopup',
      payload: {
        fileKey: folderInfo.key,
        title: `修改 ${folderInfo.title}`,
        type: 'Folder',
        fileDefaultValue: [
          { name: 'title', value: folderInfo.title },
          { name: 'desc', value: folderInfo.desc },
        ],
      } as editFileState,
    });
  };
  //收藏&取消收藏
  const changeCollect = () => {
    setFolderInfo({
      ...folderInfo,
      isCollect: !folderInfo.isCollect,
    });
  };

  return (
    <div
      className={`folderDetail ${
        isExpand ? 'folderDetail-entry' : 'folderDetail-leave'
      }`}
    >
      {/*标题*/}
      <div className={'folderDetailTitle justify_between flex_align'}>
        <span className={'font_16'}>{folderInfo.title}</span>
        <div className={'flex flex_align'}>
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
          <MoreOperation
            trigger={'click'}
            className={'iconMore flex flex_align'}
            fileInfo={folderInfo}
            type={folderInfo.type}
            placement={'bottomLeft'}
          />
        </div>
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
    </div>
  );
};
export default connect()(FolderDetail);
