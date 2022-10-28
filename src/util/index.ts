import { MenuType } from '@/components/AniPopoverMenu';
import { codeType } from '@/common/config';

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (val: unknown) =>
  val === null || val === undefined || val === '';

//删除无效字符对象
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};
// 修改state
export const useSetState = <T>(state: T, setState: (arg: T) => void) => {
  return (value: Partial<T>) => {
    setState({
      ...state,
      ...value,
    });
  };
};

//找到defaultSelect所在的位置的集合，含父亲的key
interface findKeyProps<T> {
  key: string;
  children?: T[];
}

export const findKey = <T extends findKeyProps<T>>(
  array: T[],
  target: string,
  record: T['key'][] = [],
): T['key'][] => {
  return array.reduce((result, { key, children }) => {
    if (key === target) return [...record, key];
    else if (children)
      return [...result, ...findKey<T>(children, target, [...record, key])];
    return result;
  }, [] as MenuType['key'][]);
};

// 通过codeType类转主要类型
export const translateCode = (type: codeType) => {
  switch (type) {
    case 'folder':
      return { type: 'Folder', desc: '文件夹' };
    case 'md':
      return { type: 'File', desc: 'Markdown文件' };
    case 'text':
      return { type: 'File', desc: 'Text文件' };
    default:
      return { type: 'Code', desc: '代码文件' };
  }
};
