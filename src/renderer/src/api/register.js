/*
 * 注册API处理函数，包括：
 * 1. 注册请求函数
 * 2. 注册响应函数
 */
import { sendRequest } from '../utils/wss.js' // 导入发送请求函数

function registerRequestHandler(username, password) {
    const registerData = {
        type: 'register',
        username: username,
        password: password
    }

    sendRequest(JSON.stringify(registerData)) // 发送请求
}

function registerResponseHandler(status) {
    // 处理注册响应
    if (status === 'success') {
    } else {
    }
}

export { registerRequestHandler, registerResponseHandler }
