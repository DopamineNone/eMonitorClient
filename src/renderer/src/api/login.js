/*
 * 登录API处理函数，包括：
 * 1. 登录请求函数
 * 2. 登录响应函数
 */
import { useStatusStore } from '../store/status.js'
import { pinia } from '../store/index.js'
import { sendRequest } from '../utils/wss.js' // 导入发送请求函数
function loginRequestHandler(username, password) {
    const mac = window.api.getMacAddress // 获取mac地址
    const loginData = {
        type: 'login',
        username: username,
        password: password,
        mac: mac
    }

    sendRequest(JSON.stringify(loginData)) // 发送登录请求
}

function loginResponseHandler(status) {
    if (status === 'success') {
        const statusStore = useStatusStore(pinia)
        statusStore.loginStatus = true // 设置登录状态为true
    }
}

export { loginRequestHandler, loginResponseHandler }
