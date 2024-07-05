/*
 * 注册API处理函数，包括：
 * 1. 注册请求函数
 * 2. 注册响应函数
 */
import { sendRequest } from '../utils/wss' // 导入发送请求函数

export function registerRequestHandler(username, password) {
    const registerData = {
        type: 'register',
        username: username,
        password: password
    }

    sendRequest(registerData) // 发送请求
}

export function registerResponseHandler(status) {
    // 处理注册响应
    if (status === 'success') {
        // 注册成功弹窗
        window.api.alert('注册成功，请登录')
    } else {
        // 注册失败弹窗
        window.api.alert('注册失败，请检查用户名或密码')
    }
}
