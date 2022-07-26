import React, {useState} from "react";
import './style/Login.less'
import {LoginComponent} from "./Login";
import {RegisterComponent} from "./Register";


export const LoginScreen = () => {
    const [state, setState] = useState({
        isLogin: true
    })
    const changeLogin = () => {
        setState(
            {
                ...state,
                isLogin: !state.isLogin
            }
        )
    }
    return <div className={state.isLogin ? "container" : "sign-up-mode container"}>
        <div className={"forms-container"}>
            <div style={{opacity: 0, width: "50%"}}
                 className={!state.isLogin ? 'registerEnterAnimate' : 'registerLeaveAnimate'}>
                <RegisterComponent/>
            </div>
            <div style={{opacity: 1, width: "50%"}}
                 className={state.isLogin ? 'loginEnterAnimate' : 'loginLeaveAnimate'}>
                <LoginComponent/>
            </div>
            {/*<p style={{textAlign: "center", fontSize: "16rem"}}>或者使用第三方账号登录</p>*/}
            {/*<div className="social-media">*/}
            {/*    <GithubFilled/>*/}
            {/*    <WechatFilled/>*/}
            {/*    <WeiboCircleFilled/>*/}
            {/*</div>*/}
        </div>
        <div className="panels-container">
            <div className="panel left-panel" style={{visibility: state.isLogin ? 'visible' : 'hidden'}}>
                <div className="content">
                    <h3 style={{fontSize: "24rem", fontWeight: "bold", color: "#FFFFFF"}}>New here ?</h3>
                    <p>Lorem ipsum,dolor sit amet consectetur adipisicing elit.
                        Debitis,ex ratione. Aliquid!</p>
                    <button onClick={changeLogin} className="btn transparent" id="sign-up-btn">注册</button>
                </div>
            </div>
            <div className="panel right-panel" style={{visibility: state.isLogin ? 'hidden' : 'visible'}}>
                <div className="content">
                    <h3 style={{fontSize: "24rem", fontWeight: "bold", color: "#FFFFFF"}}>One of us ?</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing
                        elit.
                        Nostrum laboriosam ad deleniti. </p>
                    <button onClick={changeLogin} className="btn transparent" id="sign-in-btn">登录
                    </button>
                </div>
            </div>


        </div>
    </div>
}