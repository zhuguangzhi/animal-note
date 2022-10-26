import style from './style/note-book.less';
import { Note } from './Note';
import { Dropdown, Menu } from 'antd';

export const NoteBook = () => {
  const MenuItems = [
    {
      key: 0,
      label: '展开',
    },
    {
      key: 1,
      label: '新增',
    },
    {
      key: 2,
      label: '重命名',
    },
    {
      key: 3,
      label: '删除',
    },
  ];
  return (
    <div className={style.bookBox}>
      <header className={'f_l_r ' + style.bookBoxHeader}>
        <span>animal</span>
        <Dropdown
          overlay={<Menu items={MenuItems} />}
          placement="bottomRight"
          arrow
        >
          <span style={{ color: '#5995FD', lineHeight: '30px' }}>...</span>
        </Dropdown>
      </header>
      <div style={{ width: '100%', flex: '1' }} className={'scrollBarStyle'}>
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
      </div>
    </div>
  );
};
