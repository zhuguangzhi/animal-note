import { Form, Input, Modal } from 'antd';
import { tipCodeList } from '@/common/config';
import {
  CustomItemProps,
  CustomSelect,
  SelectChangeType,
} from '@/components/CustomSelect';
import React from 'react';
import { connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/modelConnect';
import { editFileState } from '@/models/editFilePopup';

//type不为Code时的名称
const NameComponent = () => {
  return (
    <Form.Item
      label={'名称'}
      name={'title'}
      rules={[{ required: true, message: '请输入名称' }]}
    >
      <Input placeholder={'请输入名称'} />
    </Form.Item>
  );
};
//code需要选择语言
const CodeComponent = () => {
  const codeList = tipCodeList.reduce((preValue, value) => {
    preValue.push({
      key: value,
      label: value,
    });
    return preValue;
  }, [] as CustomItemProps[]);
  const handleChange = (
    newValue: string,
    option: SelectChangeType['option'],
  ) => {
    console.log(newValue, option);
  };
  return (
    <Form.Item label={'名称'}>
      <div className={'flex'} style={{ width: '100%' }}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: '请输入名称' }]}
          style={{ display: 'inline-block', flex: 1 }}
        >
          <Input placeholder="名称" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="codeType"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: '120px' }}
          initialValue={codeList[0]}
        >
          <CustomSelect
            showSearch
            defaultActiveFirstOption={false}
            filterOption={true}
            onChange={handleChange}
            notFoundContent={null}
            optionList={codeList}
          />
        </Form.Item>
      </div>
    </Form.Item>
  );
};

const Modify = ({
  editFilePopup,
  dispatch,
}: {
  editFilePopup: editFileState;
  dispatch: Dispatch;
}) => {
  const [form] = Form.useForm();
  const onClosePopup = () => {
    dispatch({
      type: 'editFilePopup/closePopup',
    });
  };
  //新建
  const addFile = async () => {
    //校验失败会阻止向下运行
    await form.validateFields();
  };
  return (
    <Modal
      title={editFilePopup.title}
      open={editFilePopup.open}
      onOk={addFile}
      onCancel={onClosePopup}
      forceRender={true}
      destroyOnClose={true}
    >
      <Form form={form} layout={'vertical'}>
        {editFilePopup.type === 'Code' ? <CodeComponent /> : <NameComponent />}
        <Form.Item
          hidden={editFilePopup.type !== 'Folder'}
          label={'描述'}
          name={'desc'}
        >
          <Input placeholder={'请输入描述'} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ editFilePopup }: ConnectState) => ({
  editFilePopup,
}))(Modify);
