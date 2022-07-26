import React from "react";
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input} from "antd";
import {LoginPostProps} from "../../type/Login";

export const RegisterComponent = () => {
    const onRegister = (e: LoginPostProps) => {
        console.log(e)
    }
    return <Form onFinish={onRegister} className="form sign-up-form">
        <h2 className="title">注册</h2>
        <Form.Item name={"username"}>
            <Input className="input_my" id={'register_username'} width={"100%"} size="large" placeholder="用户名"
                   prefix={<UserOutlined/>}/>
        </Form.Item>
        <Form.Item name={"email"}>
            <Input className="input_my" id={'register_email'} width={"100%"} size="large" placeholder="邮箱"
                   prefix={<MailOutlined/>}/>
        </Form.Item>
        <Form.Item name={"password"}>
            <Input className="input_my" id={'register_password'} width={"100%"} size="large" placeholder="密码"
                   autoComplete={"true"}
                   type={"password"}
                   prefix={<LockOutlined/>}/>
        </Form.Item>
        <Form.Item style={{textAlign: "center"}}>
            <Button className={"loginButton"} htmlType={"submit"} size={"large"}>REGISTER</Button>
        </Form.Item>
    </Form>
}