/*
 * 登录API处理函数，包括：
 * 1. 登录请求函数
 * 2. 登录响应函数
 */
import { sendRequest } from '../utils/wss'

export function loginRequestHandler(username, password) {
    const loginData = {
        type: 'login',
        username: username,
        password: password,
        mac: window.api.MAC // 获取本机MAC地址
    }

    sendRequest(loginData) // 发送登录请求
}

export function loginResponseHandler(status) {
    if (status === 'success') {
        window.api.alert('登录成功！')
        window.setLoginStatus(true) // 设置登录状态为true
    } else {
        window.api.alert('登录失败！')
    }
}
