import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { LoginPostProps } from '@/type/Login';
import { history } from 'umi';

export const LoginComponent = () => {
  const onLogin = (e: LoginPostProps) => {
    console.log('e', e);
    history.push('/index');
  };
  return (
    <Form onFinish={onLogin} className="form sign-in-form">
      <h2 className="title">登录</h2>
      <Form.Item name={'username'}>
        <Input
          className="input_my"
          id={'username'}
          autoComplete={'off'}
          width={'100%'}
          size="large"
          placeholder="用户名"
          prefix={<UserOutlined />}
        />
      </Form.Item>
      <Form.Item name={'password'}>
        <Input
          className="input_my"
          width={'100%'}
          size="large"
          placeholder="密码"
          autoComplete={'true'}
          type={'password'}
          id={'password'}
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item style={{ textAlign: 'center' }}>
        <Button className={'loginButton'} htmlType={'submit'} size={'large'}>
          LOGIN
        </Button>
      </Form.Item>
    </Form>
  );
};
export default LoginComponent;
