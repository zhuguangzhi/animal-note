import { Reducer, Effect } from '@umijs/max';
import { MenuType } from '@/components/AniPopoverMenu';

export type editFileState = {
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
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      console.log('payload', payload);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
// export暴露拿不到值 只能使用export default
export default editFilePopup;
