/*
 * 登录API处理函数，包括：
 * 1. 登录请求函数
 * 2. 登录响应函数
 */
import { useStatusStore } from '../store/status.js'
import { pinia } from '../store/index.js'
import { sendRequest } from '../utils/wss.js'

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
        const statusStore = useStatusStore(pinia)
        statusStore.loginStatus = true // 设置登录状态为true
    }
}
