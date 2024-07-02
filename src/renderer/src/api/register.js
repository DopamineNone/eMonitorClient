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

function registerResponseHandler(reponse) {
    // 注册响应处理函数,看看api会怎么更新
}

export { registerRequestHandler, registerResponseHandler }
