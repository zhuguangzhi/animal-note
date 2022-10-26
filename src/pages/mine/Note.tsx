import style from './style/note-book.less';
import { IconFont } from '@/components/IconFont';

export const Note = () => {
  return (
    <div className={style.book}>
      <p>wer book</p>
      <div className={'f_l_r'}>
        <div className={style.bookOption}>
          <IconFont icon={'star'} />
          <IconFont icon={'delete'} />
          <IconFont icon={'share-three'} />
          <IconFont icon={'tag'} />
        </div>
        <span className={style.bookTime}>2022-07-29 13:89</span>
      </div>
    </div>
  );
};
