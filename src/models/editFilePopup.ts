import { Reducer, Effect } from '@umijs/max';
import { MenuType } from '@/components/AniPopoverMenu';

type fileDefaultValueProps = {
  name: string;
  value: unknown;
};
export type editFileState = {
  fileKey: string | null; //文件或文件夹的key，有修改 无则新增
  fileDefaultValue: fileDefaultValueProps[]; //文件的默认值
  title: string; //标题
  open: boolean;
  type: MenuType['type']; //文件夹|文件
};
type editFileModelPopup = {
  namespace: 'editFilePopup';
  state: editFileState;
  effects: {
    openPopup: Effect;
    closePopup: Effect;
  };
  reducers: {
    save: Reducer<editFileState>;
  };
};
const editFilePopup: editFileModelPopup = {
  namespace: 'editFilePopup',
  state: {
    fileDefaultValue: [],
    fileKey: null,
    open: false,
    type: 'Folder',
    title: '',
  },
  effects: {
    //打开弹窗
    *openPopup({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          open: true,
          ...payload,
        },
      });
    },
    //关闭弹窗
    *closePopup({}, { put }) {
      yield put({
        type: 'save',
        payload: {
          open: false,
          title: '',
          fileKey: null,
          fileDefaultValue: [],
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
// export暴露拿不到值 只能使用export default
export default editFilePopup;
