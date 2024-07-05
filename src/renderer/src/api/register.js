/*
 * 注册API处理函数，包括：
 * 1. 注册请求函数
 * 2. 注册响应函数
 */
import { sendRequest } from '../utils/wss' // 导入发送请求函数

export function registerRequestHandler(username, password) {
    const registerData = {
        type: 'register',
        msg: {
            username: username,
            password: password,
            mac: window.api.MAC
        }
    }

    sendRequest(registerData) // 发送请求
    console.log('注册请求已发送', registerData)
}

export function registerResponseHandler(status) {
    // 处理注册响应
    if (status === 'success') {
        // 注册成功弹窗
        window.api.alert('注册成功，自动登录...')
        window.setLoginStatus(true)
    } else {
        // 注册失败弹窗
        window.api.alert('注册失败，请检查用户名或密码')
    }
}
