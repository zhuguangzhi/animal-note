import BaseConfig from '@/util/BaseConfig';
import { NoteBook } from './NoteBook';
import style from './style/index.less';
import { Input, Select } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';

export default () => {
  const SelectOptions: DefaultOptionType[] = [
    {
      value: 0,
      label: 'animal note',
    },
  ];
  return (
    <div className={`${style.container} animate animate__fadeInLeftBig`}>
      <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
        {BaseConfig.NodeName}
      </span>
      <div className={'f_a_c'}>
        <Input
          style={{ width: '300rem', margin: '20px 20px 20px 0' }}
          size={'middle'}
          placeholder={'笔记名'}
        />
        <Select value={0} options={SelectOptions} />
      </div>
      <div className={style.noteBookList}>
        <NoteBook />
        <NoteBook />
        <NoteBook />
        <NoteBook />
        <NoteBook />
        <NoteBook />
        <NoteBook />
        <NoteBook />
      </div>
    </div>
  );
};
