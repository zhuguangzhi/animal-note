import router, { useSetUrlParams } from '@/hook/url';
import { BookType } from '@/type/bookType';
import { keyConfig } from '@/common/keyConfig';

//文件夹则进入文件夹详情页
//文件则直接打开文件
export const useEntryBook = () => {
  const { bookIdKey, nodeIdKey, nodeTypeKey } = keyConfig;
  const setParam = useSetUrlParams();
  return (option: Partial<BookType>) => {
    if (option.type === 'folder') setParam({ [bookIdKey]: option.key });
    else {
      router.push('/note', {
        [nodeIdKey]: option.key,
        [nodeTypeKey]: option.type,
      });
    }
  };
};
