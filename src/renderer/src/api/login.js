/*
 * 登录API处理函数，包括：
 * 1. 登录请求函数
 * 2. 登录响应函数
 */
import { sendRequest } from '../utils/wss.js' // 导入发送请求函数
function loginRequestHandler(username, password) {
    const loginData = {
        type: 'login',
        username: username,
        password: password
    }

    sendRequest(JSON.stringify(loginData)) // 发送登录请求
}

function loginResponseHandler(status) {
    return status === 'success'
}

export { loginRequestHandler, loginResponseHandler }
