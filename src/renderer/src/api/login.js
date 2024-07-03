/*
 * 登录API处理函数，包括：
 * 1. 登录请求函数
 * 2. 登录响应函数
 */
import { sendRequest } from '../utils/wss.js' // 导入发送请求函数
import { useStatusStore } from '../store/status.js'
function loginRequestHandler(username, password) {
    const mac = window.api.getMacAddress() // 获取mac地址
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
        const statusStore = useStatusStore()
        statusStore.isLoggedIn = true // 登录成功，设置状态
    }
}

export { loginRequestHandler, loginResponseHandler }
